import { useLocalStorage } from './useLocalStorage';
import { Child, QuizResult, ExerciseResult } from '../types';
import { defaultChildrenData } from '../utils/childrenData';

export function useChildrenData() {
  const [childrenData, setChildrenData] = useLocalStorage<Record<string, Child>>('childrenData', defaultChildrenData);
  const [quizResults, setQuizResults] = useLocalStorage<QuizResult[]>('quizResults', []);
  const [exerciseResults, setExerciseResults] = useLocalStorage<ExerciseResult[]>('exerciseResults', []);

  const updateChildProgress = (childId: string, area: string, progress: number) => {
    setChildrenData(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        progress: {
          ...prev[childId].progress,
          [area]: progress
        }
      }
    }));
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizResults(prev => [...prev, result]);
  };

  const addExerciseResult = (result: ExerciseResult) => {
    setExerciseResults(prev => [...prev, result]);
  };

  const getChildProgress = (childId: string) => {
    return childrenData[childId]?.progress || {};
  };

  const getChildQuizResults = (childId: string) => {
    return quizResults.filter(result => result.childId === childId);
  };

  const getTodaysStats = (childId: string) => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todayQuizResults = quizResults.filter(result => {
      const resultDate = new Date(result.date);
      return result.childId === childId && resultDate >= todayStart && resultDate < todayEnd;
    });
    
    const todayExerciseResults = exerciseResults.filter(result => {
      const resultDate = new Date(result.date);
      return result.childId === childId && resultDate >= todayStart && resultDate < todayEnd;
    });
    
    return {
      exercisesCompleted: todayExerciseResults.length,
      quizzesTaken: todayQuizResults.length,
      minutesPracticed: [...todayQuizResults, ...todayExerciseResults].reduce((total, result) => total + result.timeSpent, 0)
    };
  };

  return {
    childrenData,
    quizResults,
    exerciseResults,
    updateChildProgress,
    addQuizResult,
    addExerciseResult,
    getChildProgress,
    getChildQuizResults,
    getTodaysStats
  };
}