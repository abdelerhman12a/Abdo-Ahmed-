import React, { useState } from 'react';
import { FlattenedQuestion } from '../types';
import { ChevronLeft, ChevronRight, ChevronsUpDown, Maximize2, X } from 'lucide-react';

interface ImagePanelProps {
  currentQuestion: FlattenedQuestion;
  totalSlides: number;
  onSlideChange: (slideIndex: number) => void;
}

const ImagePanel: React.FC<ImagePanelProps> = ({ currentQuestion, totalSlides, onSlideChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentSlideIndex = currentQuestion.slideIndex;

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) onSlideChange(currentSlideIndex - 1);
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) onSlideChange(currentSlideIndex + 1);
  };

  return (
    <>
      {/* Slide Toolbar */}
      <div className="bg-white p-3 border-b border-slate-200 flex items-center gap-3 shadow-sm z-10 shrink-0">
        <button 
          onClick={handlePrevSlide}
          disabled={currentSlideIndex === 0}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-grow relative group">
          <select 
            value={currentSlideIndex}
            onChange={(e) => onSlideChange(parseInt(e.target.value))}
            className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 text-sm font-medium cursor-pointer transition-shadow hover:shadow-sm"
          >
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <option key={idx} value={idx}>Slide {idx + 1}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <ChevronsUpDown size={14} />
          </div>
        </div>

        <button 
          onClick={handleNextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Image Container */}
      <div className="flex-grow relative flex items-center justify-center bg-slate-100 overflow-hidden p-4 group">
        <div 
          className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <img 
            src={currentQuestion.image} 
            alt="Physiology Case" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Available';
            }}
          />
          
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
            <Maximize2 size={12} />
            Click to enlarge
          </div>
        </div>
      </div>
      
      {/* Slide Badge */}
      <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur text-slate-600 text-xs font-bold px-3 py-1 rounded-tr-lg border-t border-r border-slate-200 z-10">
        Slide {currentSlideIndex + 1} / {totalSlides}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none p-2"
            onClick={() => setIsZoomed(false)}
          >
            <X size={32} />
          </button>
          <img 
            src={currentQuestion.image} 
            alt="Enlarged View" 
            className="max-w-[95vw] max-h-[95vh] rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      )}
    </>
  );
};

export default ImagePanel;