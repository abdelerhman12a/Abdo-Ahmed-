import React, { useState, useMemo, useCallback } from 'react';
import { QUIZ_DATA } from './constants';
import { FlattenedQuestion } from './types';
import Header from './components/Header';
import ImagePanel from './components/ImagePanel';
import QuizPanel from './components/QuizPanel';
import ResultsPanel from './components/ResultsPanel';
import { CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  // Flatten quiz data for linear navigation while preserving slide metadata
  const flattenedQuestions = useMemo<FlattenedQuestion[]>(() => {
    let globalIndex = 0;
    return QUIZ_DATA.flatMap((slide, slideIndex) => 
      slide.questions.map((q, qIndex) => ({
        ...q,
        id: `s${slideIndex}-q${qIndex}`,
        image: slide.image,
        slideIndex,
        questionIndexInSlide: qIndex,
        globalIndex: globalIndex++
      }))
    );
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = flattenedQuestions[currentQuestionIndex];
  const totalQuestions = flattenedQuestions.length;
  
  // Calculate progress
  // We count a question as "complete" for progress bar if it has an answer
  const completedCount = Object.keys(answers).length;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  const handleAnswerSelect = useCallback((option: string) => {
    // Only allow answering if not already answered
    if (answers[currentQuestionIndex]) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  }, [currentQuestionIndex, answers]);

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleJumpToSlide = (slideIndex: number) => {
    const targetQuestion = flattenedQuestions.find(q => q.slideIndex === slideIndex);
    if (targetQuestion) {
      setCurrentQuestionIndex(targetQuestion.globalIndex);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizComplete(false);
  };

  // Calculate score
  const score = useMemo(() => {
    return flattenedQuestions.reduce((acc, q) => {
      const userAnswer = answers[q.globalIndex];
      // Loose matching for cases like "A) Answer" vs "Answer"
      const isCorrect = userAnswer === q.answer || 
                        (userAnswer && q.answer.includes(userAnswer)) || 
                        (userAnswer && userAnswer.includes(q.answer));
      return isCorrect ? acc + 1 : acc;
    }, 0);
  }, [answers, flattenedQuestions]);

  return (
    <div className="flex flex-col h-full bg-slate-100">
      <Header progress={progressPercentage} />
      
      <main className="flex-grow container mx-auto max-w-7xl p-4 md:p-6 overflow-hidden h-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-full">
          
          {/* Left Panel: Image & Navigation */}
          <div className="md:w-1/2 bg-slate-50 border-r border-slate-200 flex flex-col relative">
             <ImagePanel 
               currentQuestion={currentQuestion} 
               totalSlides={QUIZ_DATA.length}
               onSlideChange={handleJumpToSlide}
             />
          </div>

          {/* Right Panel: Quiz or Results */}
          <div className="md:w-1/2 flex flex-col h-full relative bg-white">
            <div className="flex-grow overflow-y-auto custom-scrollbar relative">
              {isQuizComplete ? (
                <ResultsPanel 
                  score={score} 
                  total={totalQuestions} 
                  onRestart={handleRestart} 
                />
              ) : (
                <QuizPanel 
                  question={currentQuestion}
                  selectedAnswer={answers[currentQuestionIndex]}
                  onAnswerSelect={handleAnswerSelect}
                />
              )}
            </div>

            {/* Sticky Bottom Controls */}
            {!isQuizComplete && (
              <div className="p-4 md:p-6 border-t border-slate-100 bg-white flex justify-between items-center shrink-0 z-20">
                <button 
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-colors ${
                    currentQuestionIndex === 0 
                      ? 'text-slate-300 cursor-not-allowed' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Back
                </button>
                
                <button 
                  onClick={handleNext}
                  className="bg-medical-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-medical-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                  {currentQuestionIndex === totalQuestions - 1 ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;