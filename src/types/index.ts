export interface Child {
  id: string;
  name: string;
  age: number;
  grade: number;
  strugglingAreas: string[];
  progress: Record<string, number>;
}

export interface Exercise {
  id: string;
  area: string;
  type: 'multiple-choice' | 'fill-in' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  id: string;
  childId: string;
  area: string;
  score: number;
  totalQuestions: number;
  date: Date;
  timeSpent: number;
}

export interface Progress {
  area: string;
  completedExercises: number;
  totalExercises: number;
  averageScore: number;
  lastActivity: Date;
}