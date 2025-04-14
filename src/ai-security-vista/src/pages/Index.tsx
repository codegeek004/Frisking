
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Users, Camera, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,238,255,0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
              AI Security Screening
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Advanced AI-driven object frisking, gender detection, and sign recognition for a safer world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToFeatures}
                className="neon-button text-lg px-6 py-6"
              >
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/demo">
                <Button 
                  variant="default" 
                  className="bg-neonBlue hover:bg-neonBlue/90 text-black font-medium text-lg px-6 py-6"
                >
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span className="text-neonBlue">Advanced</span> Features
            </h2>
            <p className="text-gray-300">
              Discover how our AI-powered security solutions can make your environment safer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Object Frisking" 
              description="Our AI technology can detect concealed objects on a person's body without physical contact, enhancing security while respecting privacy."
              icon={Eye}
            />
            <FeatureCard 
              title="Gender Detection" 
              description="Accurately identify gender from images or video streams to enhance demographic analysis and personalized security protocols."
              icon={Users}
            />
            <FeatureCard 
              title="Sign Recognition" 
              description="Intelligent sign and gesture recognition technology that can interpret visual communication for enhanced security monitoring."
              icon={Camera}
            />
          </div>
        </div>
      </section>

      {/* Object Frisking Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Object <span className="text-neonBlue">Frisking</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Our advanced object frisking technology uses deep learning algorithms to detect concealed objects without the need for physical contact. This non-invasive approach maintains privacy while enhancing security.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Identifies potentially dangerous objects through clothing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Works in real-time with standard security cameras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>High accuracy rate with minimal false positives</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 rounded-lg overflow-hidden card-glow">
              <div className="bg-gray-800 h-[300px] flex items-center justify-center">
                <Eye className="h-24 w-24 text-neonBlue opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gender Detection Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Gender <span className="text-neonBlue">Detection</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Our gender detection system uses computer vision and machine learning to accurately identify gender from images or video streams, enabling more personalized security protocols and demographic analysis.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>High accuracy gender classification from facial and body features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Works with partial occlusion and varied lighting conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Privacy-focused with optional anonymization features</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 rounded-lg overflow-hidden card-glow">
              <div className="bg-gray-800 h-[300px] flex items-center justify-center">
                <Users className="h-24 w-24 text-neonBlue opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Recognition Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Sign <span className="text-neonBlue">Recognition</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Our sign recognition technology can identify and interpret various gestures and signs, providing an additional layer of security through visual communication understanding.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Recognizes a wide range of signs and gestures in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Uses pose estimation algorithms for accurate tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neonBlue font-bold">•</span>
                  <span>Can be customized to recognize specific security-related signals</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 rounded-lg overflow-hidden card-glow">
              <div className="bg-gray-800 h-[300px] flex items-center justify-center">
                <Camera className="h-24 w-24 text-neonBlue opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Experience Our AI Security Technology
            </h2>
            <p className="text-gray-300 mb-8">
              See our technology in action and discover how it can transform your security infrastructure.
            </p>
            <Link to="/demo">
              <Button 
                variant="default" 
                className="bg-neonBlue hover:bg-neonBlue/90 text-black font-medium text-lg px-6 py-6"
              >
                Try Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
