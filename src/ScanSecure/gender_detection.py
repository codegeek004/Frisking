import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os
from django.conf import settings

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

def detect_gender(image_path):
    model = build_model()
    
    frame = cv2.imread(image_path)
    if frame is None:
        return None, "Error: Unable to read the image."

    preprocessed_frame = preprocess_frame(frame)
    prediction = model.predict(preprocessed_frame)[0][0]
    
    gender = 'Female' if prediction > 0.5 else 'Male'
    return gender, None
