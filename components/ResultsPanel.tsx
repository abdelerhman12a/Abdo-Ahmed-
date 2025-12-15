import React from 'react';
import { Award, RotateCcw } from 'lucide-react';

interface ResultsPanelProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ score, total, onRestart }) => {
  const percentage = (score / total) * 100;
  
  let feedback = "";
  if (percentage === 100) {
    feedback = "Perfect! You're a physiology expert! 🏆";
  } else if (percentage >= 80) {
    feedback = "Great job! You really know your concepts. 🎉";
  } else if (percentage >= 50) {
    feedback = "Good effort, but a little review might help. 👍";
  } else {
    feedback = "Keep studying! You'll get it next time. 📚";
  }

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in p-8">
      <div className="w-24 h-24 bg-medical-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-medical-50 ring-offset-2">
        <Award className="text-medical-500" size={48} />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
      <p className="text-slate-500 mb-8">Here is how you performed</p>
      
      <div className="bg-slate-50 rounded-2xl p-8 w-full max-w-sm border border-slate-100 text-center mb-8 shadow-sm">
        <span className="text-6xl font-black text-medical-600 block mb-2">{score}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Score</span>
        <div className="w-full h-px bg-slate-200 my-4"></div>
        <p className="text-slate-700 font-medium">{feedback}</p>
      </div>

      <button 
        onClick={onRestart}
        className="group bg-slate-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <RotateCcw className="group-hover:-rotate-180 transition-transform duration-500" size={20} />
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultsPanel;