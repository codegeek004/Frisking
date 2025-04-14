
import React from 'react';
import { Github, Linkedin, Mail, Code, BrainCircuit, Languages } from 'lucide-react';
import Layout from '@/components/Layout';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  languages: string[];
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  bio,
  skills,
  languages,
  image,
  github,
  linkedin,
  email,
}) => {
  return (
    <div className="card-glow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neonBlue/50 flex-shrink-0">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-neonBlue mb-2">{role}</p>
            <p className="text-gray-300 mb-4">{bio}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-neonBlue mt-0.5" />
                <div>
                  <p className="text-white font-medium">Skills:</p>
                  <p className="text-gray-300">{skills.join(', ')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Languages className="h-5 w-5 text-neonBlue mt-0.5" />
                <div>
                  <p className="text-white font-medium">Programming Languages:</p>
                  <p className="text-gray-300">{languages.join(', ')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-neonBlue transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-neonBlue transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-neonBlue transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Alex Johnson",
      role: "Team Lead & Computer Vision Specialist",
      bio: "Alex specializes in computer vision algorithms and leads the AI Security Screening project. With 5+ years of experience in AI security applications, Alex has developed innovative approaches to object detection.",
      skills: ["Computer Vision", "Deep Learning", "Project Management", "Security Systems"],
      languages: ["Python", "C++", "TensorFlow", "PyTorch"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@aisecurityvista.com",
    },
    {
      name: "Maya Rodriguez",
      role: "Machine Learning Engineer",
      bio: "Maya focuses on developing and training the machine learning models used in our gender detection system. She has expertise in pattern recognition and neural network optimization.",
      skills: ["Machine Learning", "Data Science", "Model Optimization", "Feature Engineering"],
      languages: ["Python", "R", "TensorFlow", "Keras"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "maya@aisecurityvista.com",
    },
    {
      name: "David Chen",
      role: "Frontend Developer",
      bio: "David is responsible for creating the user interface and experience for our AI security applications. He specializes in building responsive and accessible web applications.",
      skills: ["Frontend Development", "UI/UX Design", "Responsive Design", "Accessibility"],
      languages: ["JavaScript", "TypeScript", "React", "HTML/CSS"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "david@aisecurityvista.com",
    },
    {
      name: "Sophia Williams",
      role: "AI Research Scientist",
      bio: "Sophia leads our research initiatives, exploring new ways to apply AI techniques to security challenges. She has published several papers on object detection in security contexts.",
      skills: ["AI Research", "Algorithm Design", "Academic Publishing", "Mathematical Modeling"],
      languages: ["Python", "MATLAB", "Julia", "LaTeX"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "sophia@aisecurityvista.com",
    },
  ];

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                About Our <span className="text-neonBlue">Team</span>
              </h1>
              <p className="text-gray-300">
                Meet the experts behind AI Security Vista's cutting-edge security technology.
              </p>
            </div>

            <div className="space-y-8">
              {teamMembers.map((member) => (
                <TeamMember key={member.name} {...member} />
              ))}
            </div>

            <div className="mt-16 card-glow rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">About Our Project</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The AI Security Screening project was developed to address the growing need for non-invasive, 
                  efficient security screening solutions in various contexts, from public venues to 
                  transportation hubs.
                </p>
                <p>
                  Our team combines expertise in computer vision, machine learning, and security systems 
                  to create innovative AI-driven solutions that enhance safety while respecting privacy.
                </p>
                <p>
                  We believe that advanced technology should be accessible and understandable, which is why 
                  we've created this demonstration platform to showcase our technologies and their applications.
                </p>
                <h3 className="text-xl font-semibold text-white mt-6 mb-2">Technologies Used</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>TensorFlow and PyTorch for deep learning models</li>
                  <li>OpenCV for image and video processing</li>
                  <li>React and TypeScript for frontend development</li>
                  <li>Node.js for backend services</li>
                  <li>Docker for containerization and deployment</li>
                </ul>
                <h3 className="text-xl font-semibold text-white mt-6 mb-2">Future Directions</h3>
                <p>
                  We're continuously improving our algorithms and expanding our capabilities. Future 
                  developments include real-time processing for CCTV systems, integration with existing security 
                  infrastructure, and mobile applications for on-the-go security assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
