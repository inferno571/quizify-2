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
  markedForReview?: number[];
  isTwoPlayer?: boolean;
  player1Name?: string;
  player2Name?: string;
  player1Answers?: Record<number, string | string[]>;
  player2Answers?: Record<number, string | string[]>;
  player1Score?: number;
  player2Score?: number;
  conflictQuestions?: number[];
}

export interface SavedQuizProgress {
  quizId: string;
  answers: Record<number, string | string[]>;
  marked: number[];
  visited: number[];
  currentPos: number;
  questionOrder?: number[];
  shuffledOptionsMap?: Record<number, string[]>;
  shuffleQuestions?: boolean;
  randomizeOptions?: boolean;
  savedAt: string;
  isTwoPlayer?: boolean;
  player1Name?: string;
  player2Name?: string;
  player2Answers?: Record<number, string | string[]>;
  conflictQuestions?: number[];
}
