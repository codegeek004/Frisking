
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neonBlue/20 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-neonBlue transition-colors px-3 py-2">
              Home
            </Link>
            <Link to="/demo" className="text-white hover:text-neonBlue transition-colors px-3 py-2">
              Live Demo
            </Link>
            <Link to="/about" className="text-white hover:text-neonBlue transition-colors px-3 py-2">
              About Team
            </Link>
            <Button 
              onClick={toggleLogin} 
              variant="outline"
              className="neon-button ml-4"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 py-2 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 text-white hover:text-neonBlue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/demo" 
              className="block px-3 py-2 text-white hover:text-neonBlue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Demo
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-white hover:text-neonBlue"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Team
            </Link>
            <div className="pt-2">
              <Button 
                onClick={toggleLogin} 
                variant="outline"
                className="neon-button w-full"
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
