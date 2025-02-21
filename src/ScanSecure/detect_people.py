import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os

# Disable GPU for compatibility with macOS
tf.config.set_visible_devices([], 'GPU')

# Load YOLO Model
def load_yolo_model():
    net = cv2.dnn.readNet("ScanSecure/utils/yolov3.weights", "ScanSecure/utils/yolov3.cfg")
    layer_names = net.getLayerNames()
    
    try:
        output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    except IndexError:
        output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    
    with open("ScanSecure/utils/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    
    return net, output_layers, classes

# Load Gender Classification Model
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

# Preprocess Image for Model
def preprocess_frame(frame):
    resized_frame = cv2.resize(frame, (224, 224))
    resized_frame = resized_frame / 255.0
    resized_frame = np.expand_dims(resized_frame, axis=0)
    return resized_frame

# Detect People in the Image
def detect_people(image_path):
    net, output_layers, classes = load_yolo_model()
    gender_model = build_model()

    frame = cv2.imread(image_path)
    height, width, _ = frame.shape

    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids = []
    confidences = []
    boxes = []
    detected_people = []

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

    if len(indexes) > 0:
        if isinstance(indexes[0], (list, np.ndarray)):
            indexes = [i[0] for i in indexes]

        for i in indexes:
            x, y, w, h = boxes[i]
            person_roi = frame[y:y+h, x:x+w]
            preprocessed_person = preprocess_frame(person_roi)
            gender_prediction = gender_model.predict(preprocessed_person)[0][0]
            gender = 'Female' if gender_prediction > 0.5 else 'Male'

            detected_people.append({"x": x, "y": y, "w": w, "h": h, "gender": gender})

            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, gender, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    output_image_path = os.path.join("ScanSecure/static/detected", os.path.basename(image_path))
    cv2.imwrite(output_image_path, frame)

    return detected_people, output_image_path
