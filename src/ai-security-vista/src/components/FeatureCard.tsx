
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="card-glow rounded-lg p-6 h-full">
      <div className="rounded-full bg-black w-14 h-14 flex items-center justify-center mb-4 border border-neonBlue/50">
        <Icon className="h-7 w-7 text-neonBlue" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
