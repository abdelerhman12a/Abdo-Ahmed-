import React from 'react';
import { FlattenedQuestion } from '../types';
import { Check, X, Lightbulb } from 'lucide-react';

interface QuizPanelProps {
  question: FlattenedQuestion;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}

const QuizPanel: React.FC<QuizPanelProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
  const isAnswered = !!selectedAnswer;

  const getOptionStyle = (option: string, index: number) => {
    if (!isAnswered) {
      return "border-slate-200 hover:border-medical-500 hover:bg-medical-50 cursor-pointer";
    }
    
    // Logic for checking correctness
    const isSelected = option === selectedAnswer;
    const isCorrect = option === question.answer || 
                      question.answer.includes(option) || 
                      option.includes(question.answer); // Loose matching

    if (isCorrect) {
      return "bg-emerald-50 border-emerald-500 text-emerald-800";
    }
    
    if (isSelected && !isCorrect) {
      return "bg-red-50 border-red-500 text-red-800";
    }
    
    return "border-slate-200 opacity-50 cursor-default";
  };

  const getIcon = (option: string) => {
    if (!isAnswered) return null;
    
    const isSelected = option === selectedAnswer;
    const isCorrect = option === question.answer || 
                      question.answer.includes(option) || 
                      option.includes(question.answer);

    if (isCorrect) return <Check className="text-emerald-600" size={20} strokeWidth={3} />;
    if (isSelected && !isCorrect) return <X className="text-red-600" size={20} strokeWidth={3} />;
    return null;
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
          {question.question}
        </h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <div 
            key={idx}
            onClick={() => onAnswerSelect(option)}
            className={`
              relative block w-full p-4 border-2 rounded-xl transition-all duration-200 font-medium group
              ${getOptionStyle(option, idx)}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`
                  inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mr-3 transition-colors
                  ${isAnswered ? 'bg-white/50' : 'bg-slate-100 text-slate-500 group-hover:bg-medical-200 group-hover:text-medical-700'}
                `}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-base md:text-lg">{option}</span>
              </div>
              {getIcon(option)}
            </div>
          </div>
        ))}
      </div>

      {isAnswered && question.note && (
        <div className="mt-6 p-5 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-sm shadow-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-sky-100 p-2 rounded-full shrink-0 text-sky-600">
              <Lightbulb size={18} />
            </div>
            <div>
              <p className="font-bold mb-1 text-sky-800 uppercase text-xs tracking-wider">Explanation</p>
              <p className="leading-relaxed text-base">{question.note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPanel;