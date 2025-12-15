import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 z-20 shrink-0">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-medical-600 text-white p-2 rounded-lg shadow-sm">
            <Activity size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Physiology Master
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm font-medium text-slate-500">
            Progress
          </div>
          <div className="w-32 md:w-48 h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-medical-500 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-bold text-medical-700 w-12 text-right">
            {progress}%
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;