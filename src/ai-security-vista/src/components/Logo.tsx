
import React from 'react';
import { Shield } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-8 w-8 text-neonBlue" />
      <span className="font-bold text-lg text-white">AI Security Vista</span>
    </div>
  );
};

export default Logo;
