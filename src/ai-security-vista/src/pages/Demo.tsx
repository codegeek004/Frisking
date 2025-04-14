
import React, { useState } from 'react';
import { Eye, Users, Camera } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';

const DemoPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log('File selected:', file.name);
    // Here you would integrate with your actual processing code
  };

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                AI Security <span className="text-neonBlue">Live Demo</span>
              </h1>
              <p className="text-gray-300">
                Test our AI security technologies by uploading your own images or videos.
              </p>
            </div>

            <Tabs defaultValue="object-frisking" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 bg-gray-900">
                <TabsTrigger value="object-frisking" className="data-[state=active]:text-neonBlue">
                  <Eye className="mr-2 h-4 w-4" />
                  Object Frisking
                </TabsTrigger>
                <TabsTrigger value="gender-detection" className="data-[state=active]:text-neonBlue">
                  <Users className="mr-2 h-4 w-4" />
                  Gender Detection
                </TabsTrigger>
                <TabsTrigger value="sign-recognition" className="data-[state=active]:text-neonBlue">
                  <Camera className="mr-2 h-4 w-4" />
                  Sign Recognition
                </TabsTrigger>
              </TabsList>

              <TabsContent value="object-frisking" className="mt-0">
                <FileUpload 
                  title="Object Frisking Demo"
                  description="Upload a video of a person to detect concealed objects. Our AI will analyze the video and highlight any suspicious items."
                  acceptedTypes="video/*"
                  isVideo={true}
                  onFileSelect={handleFileSelect}
                />
                <div className="mt-8 p-6 card-glow rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                  <p className="text-gray-300 mb-4">
                    Our object frisking technology uses advanced computer vision algorithms to detect concealed objects on a person's body through their clothing. The system works by:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                    <li>Analyzing video frames to identify human figures</li>
                    <li>Detecting anomalies in the body silhouette using thermal and contour analysis</li>
                    <li>Applying deep learning models to classify potential objects</li>
                    <li>Generating real-time alerts for security personnel</li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="gender-detection" className="mt-0">
                <FileUpload 
                  title="Gender Detection Demo"
                  description="Upload an image to detect and classify gender. Our AI will analyze facial and body features to determine gender."
                  acceptedTypes="image/*"
                  onFileSelect={handleFileSelect}
                />
                <div className="mt-8 p-6 card-glow rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                  <p className="text-gray-300 mb-4">
                    Our gender detection system uses a combination of facial analysis and body pose estimation to accurately identify gender:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                    <li>Facial feature extraction using convolutional neural networks</li>
                    <li>Secondary validation through body proportion analysis</li>
                    <li>Ensemble learning to combine multiple prediction models</li>
                    <li>Confidence scoring to ensure reliable results</li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="sign-recognition" className="mt-0">
                <FileUpload 
                  title="Sign Recognition Demo"
                  description="Upload an image to detect and interpret signs and gestures. Our AI will analyze the image and identify the meaning of gestures."
                  acceptedTypes="image/*"
                  onFileSelect={handleFileSelect}
                />
                <div className="mt-8 p-6 card-glow rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                  <p className="text-gray-300 mb-4">
                    Our sign recognition technology can identify and interpret a wide range of hand gestures and body language:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-300">
                    <li>Hand and body keypoint detection using pose estimation</li>
                    <li>Gesture classification using recurrent neural networks</li>
                    <li>Temporal pattern recognition for dynamic gestures</li>
                    <li>Context-aware interpretation based on environmental factors</li>
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DemoPage;
