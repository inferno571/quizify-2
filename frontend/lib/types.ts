export interface Question {
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject?: string;
  date: string;
  questions: Question[];
}

export interface QuizAttempt {
  answers: Record<number, string | string[]>;
  starred: number[];
  score: number;
}
