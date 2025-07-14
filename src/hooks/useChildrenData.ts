import { useLocalStorage } from './useLocalStorage';
import { Child, QuizResult } from '../types';
import { defaultChildrenData } from '../utils/childrenData';

export function useChildrenData() {
  const [childrenData, setChildrenData] = useLocalStorage<Record<string, Child>>('childrenData', defaultChildrenData);
  const [quizResults, setQuizResults] = useLocalStorage<QuizResult[]>('quizResults', []);

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

  const getChildProgress = (childId: string) => {
    return childrenData[childId]?.progress || {};
  };

  const getChildQuizResults = (childId: string) => {
    return quizResults.filter(result => result.childId === childId);
  };

  const getTodaysStats = (childId: string) => {
    const today = new Date().toDateString();
    const todayResults = quizResults.filter(
      result => result.childId === childId && result.date.toString().includes(today)
    );
    
    return {
      exercisesCompleted: 0, // Will be implemented when exercises are created
      quizzesTaken: todayResults.length,
      minutesPracticed: todayResults.reduce((total, result) => total + result.timeSpent, 0)
    };
  };

  return {
    childrenData,
    quizResults,
    updateChildProgress,
    addQuizResult,
    getChildProgress,
    getChildQuizResults,
    getTodaysStats
  };
}