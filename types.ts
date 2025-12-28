
export enum QuestionType {
  MCQ = 'MCQ',
  ASSERTION_REASON = 'ASSERTION_REASON',
  MATCHING = 'MATCHING',
  MAP_BASED = 'MAP_BASED'
}

export interface Question {
  id: string;
  type: QuestionType;
  exam: string;
  year: string;
  language: 'hi';
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  matchingListA?: string[];
  matchingListB?: string[];
  imageUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  timeMinutes: number;
  questions: Question[];
  isPremium: boolean;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  count: number;
}

export interface StudyNote {
  id: string;
  topic: string;
  subject: 'Ancient' | 'Medieval' | 'Modern' | 'World' | 'Historiography';
  facts: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  isAdmin: boolean;
  paymentRequested?: boolean;
}
