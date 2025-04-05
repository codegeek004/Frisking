import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

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
    if len(frame.shape) == 3 and frame.shape[2] == 3:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    resized_frame = cv2.resize(frame, (224, 224))
    resized_frame = resized_frame / 255.0
    resized_frame = np.expand_dims(resized_frame, axis=0)
    return resized_frame

def capture_and_predict(model):
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not access webcam.")
        return

    ret, frame = cap.read()
    cap.release()

    if not ret:
        print("Error: Failed to capture image.")
        return

    preprocessed = preprocess_frame(frame)
    prediction = model.predict(preprocessed)[0][0]

    gender = 'Female' if prediction > 0.5 else 'Male'
    print(f"Predicted Gender: {gender} ({prediction:.2f})")

    # Optional: Show the frame with the prediction
    cv2.putText(frame, f'Gender: {gender}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Captured Frame', frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def main():
    print("Loading model...")
    model = build_model()
    print("Capturing image and predicting...")
    capture_and_predict(model)

if __name__ == "__main__":
    main()
