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
    print('ind')
    if len(frame.shape) == 3 and frame.shape[2] == 3:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    resized_frame = cv2.resize(frame, (224, 224))
    resized_frame = resized_frame / 255.0
    resized_frame = np.expand_dims(resized_frame, axis=0)
    return resized_frame

def process_video(video_path, model):
    print('inside video process')
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter('result.mp4', fourcc, fps, (width, height))
    
    predictions = []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        preprocessed_frame = preprocess_frame(frame)
        
        features = model.predict(preprocessed_frame)
        predictions.append(features[0][0])
        
        gender = 'Female' if features[0][0] > 0.5 else 'Male'
        cv2.putText(frame, f'Gender: {gender}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        out.write(frame)
        cv2.imshow('Gender Detection', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    
    average_prediction = np.mean(predictions)
    final_gender = 'Female' if average_prediction > 0.5 else 'Male'
    print(f'Final Predicted Gender: {final_gender}')

def main():
    video_path = 'frisking.mp4'
    model = build_model()
    process_video(video_path, model)

if __name__ == "__main__":
    main()

