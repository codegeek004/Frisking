import cv2
import numpy as np
import sys
import tensorflow as tf
import tensorflow_hub as hub

# Disable GPU to avoid memory issues (optional)
tf.config.set_visible_devices([], 'GPU')

def load_yolo_model():
    net = cv2.dnn.readNet("darknet/yolov3.weights", "yolov3.cfg")
    layer_names = net.getLayerNames()
    try:
        output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    except IndexError:
        output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    with open("coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    return net, output_layers, classes

def detect_people(frame, net, output_layers, classes):
    height, width, channels = frame.shape
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids = []
    confidences = []
    boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and classes[class_id] == 'person':
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    return boxes, indexes, class_ids

def build_model():
    pretrained_model_url = "https://tfhub.dev/google/imagenet/mobilenet_v2_100_224/feature_vector/5"
    pretrained_model = hub.KerasLayer(pretrained_model_url, input_shape=(224, 224, 3), trainable=False)

    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=(224, 224, 3)),
        tf.keras.layers.Lambda(lambda x: pretrained_model(x)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

def preprocess_frame(frame):
    resized_frame = cv2.resize(frame, (224, 224))
    resized_frame = resized_frame / 255.0
    resized_frame = np.expand_dims(resized_frame, axis=0)
    return resized_frame

def count_people_and_alert(frame, region, net, output_layers, classes, gender_model):
    x, y, w, h = region
    cropped_frame = frame[y:y+h, x:x+w]

    boxes, indexes, class_ids = detect_people(cropped_frame, net, output_layers, classes)
    
    region_box = np.array([[0, 0, w, h]])
    num_people = 0

    if len(indexes) > 0:
        if isinstance(indexes[0], (list, np.ndarray)):
            indexes = [i[0] for i in indexes]
        
        for i in indexes:
            bx, by, bw, bh = boxes[i]
            if (region_box[0][0] < bx < region_box[0][2] and region_box[0][1] < by < region_box[0][3]) or \
               (region_box[0][0] < bx + bw < region_box[0][2] and region_box[0][1] < by + bh < region_box[0][3]):
                num_people += 1
                
                person_roi = cropped_frame[by:by+bh, bx:bx+bw]
                preprocessed_person = preprocess_frame(person_roi)
                gender_prediction = gender_model.predict(preprocessed_person)[0][0]
                gender = 'Female' if gender_prediction > 0.5 else 'Male'
                
                label = f"{classes[class_ids[i]]} - {gender}"
                cv2.rectangle(cropped_frame, (bx, by), (bx + bw, by + bh), (0, 255, 0), 2)
                cv2.putText(cropped_frame, label, (bx, by - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    if num_people > 2:
        print("Alert: More than 2 people detected!")
    else:
        print(f"Number of people detected: {num_people}")

    cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
    frame[y:y+h, x:x+w] = cropped_frame

    return frame

def main(region):
    net, output_layers, classes = load_yolo_model()
    gender_model = build_model()

    cap = cv2.VideoCapture(0)  # Use 0 for the default camera
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to access the camera.")
            break

        frame = cv2.resize(frame, (600, 400))
        frame = count_people_and_alert(frame, region, net, output_layers, classes, gender_model)
        
        cv2.imshow("Real-Time Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to quit
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python detect_people.py <x> <y> <w> <h>")
        sys.exit(1)

    x = int(sys.argv[1])
    y = int(sys.argv[2])
    w = int(sys.argv[3])
    h = int(sys.argv[4])
    region = (x, y, w, h)

    main(region)

