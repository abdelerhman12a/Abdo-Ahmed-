export interface Question {
  question: string;
  options: string[];
  answer: string;
  note?: string;
}

export interface SlideData {
  image: string;
  questions: Question[];
}

export interface FlattenedQuestion extends Question {
  id: string;
  image: string;
  slideIndex: number;
  questionIndexInSlide: number;
  globalIndex: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>; // globalIndex -> selectedOption
  isComplete: boolean;
}