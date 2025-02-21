import cv2
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from django.conf import settings
from .helpers import mediapipe_detection, draw_styled_landmarks, extract_keypoints
import mediapipe as mp

mp_holistic = mp.solutions.holistic

# Define the actions to detect
actions = np.array(['Hello', 'Thanks', 'I like you', "Home", "Beautiful"])

# Load the trained model
model = Sequential([
    LSTM(64, return_sequences=True, activation='relu', input_shape=(30, 1662)),
    LSTM(128, return_sequences=True, activation='relu'),
    LSTM(64, return_sequences=False, activation='relu'),
    Dense(64, activation='relu'),
    Dense(32, activation='relu'),
    Dense(len(actions), activation='softmax')
])

# Load model weights
model.load_weights(str(settings.BASE_DIR / "ScanSecure/utils/actionnarayanprabhu.h5"))

def detect_sign(video_path):
    sequence = []
    sentence = []
    threshold = 0.8

    cap = cv2.VideoCapture(video_path)
    results_data = []

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Process frame with Mediapipe
            image, results = mediapipe_detection(frame, holistic)
            draw_styled_landmarks(image, results)

            # Extract keypoints and make predictions
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]

            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                action = actions[np.argmax(res)]
                confidence = res[np.argmax(res)]

                if confidence > threshold:
                    if not sentence or action != sentence[-1]:
                        sentence.append(action)

                if len(sentence) > 5:
                    sentence = sentence[-5:]

                results_data.append((action, confidence))

        cap.release()

    return results_data
