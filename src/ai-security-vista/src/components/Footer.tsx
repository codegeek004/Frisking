
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neonBlue/20 bg-black/90 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-neonBlue" />
              <span className="font-bold text-white">AI Security Vista</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Advanced AI-driven security solutions for a safer world.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-neonBlue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-neonBlue transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-neonBlue transition-colors">
                  About Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:info@aisecurityvista.com" className="flex items-center gap-2 text-gray-400 hover:text-neonBlue transition-colors">
                <Mail size={16} />
                <span>info@aisecurityvista.com</span>
              </a>
              <a href="https://github.com/ai-security-vista" className="flex items-center gap-2 text-gray-400 hover:text-neonBlue transition-colors">
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AI Security Vista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
