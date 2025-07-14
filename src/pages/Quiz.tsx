import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Exercise, QuizResult } from '../types';
import { getExercisesByArea } from '../utils/exercises';
import { mathAreas } from '../utils/childrenData';
import { useChildrenData } from '../hooks/useChildrenData';

const QuizPage: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { addQuizResult, updateChildProgress } = useChildrenData();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [quizScore, setQuizScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (areaId) {
      const areaExercises = getExercisesByArea(areaId);
      // Select 5 random exercises for the quiz
      const shuffled = [...areaExercises].sort(() => Math.random() - 0.5);
      setExercises(shuffled.slice(0, 5));
    }
  }, [areaId]);

  const finishQuiz = React.useCallback((finalAnswers: string[] = userAnswers) => {
    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Calculate score
    let correctAnswers = 0;
    exercises.forEach((exercise, index) => {
      if (finalAnswers[index]?.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / exercises.length) * 100);
    setQuizScore(score);

    // Create quiz result
    const quizResult: QuizResult = {
      id: `quiz_${Date.now()}`,
      childId: getChildIdFromArea(areaId!),
      area: areaId!,
      score: correctAnswers,
      totalQuestions: exercises.length,
      date: new Date(),
      timeSpent: timeSpent
    };

    // Save quiz result and update progress
    addQuizResult(quizResult);
    updateChildProgress(quizResult.childId, areaId!, score);

    setShowResults(true);
  }, [userAnswers, startTime, exercises, areaId, addQuizResult, updateChildProgress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeRemaining > 0 && !showResults) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !showResults) {
      finishQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, quizStarted, showResults, finishQuiz]);

  const startQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const nextQuestion = () => {
    const newAnswers = [...userAnswers, currentAnswer];
    setUserAnswers(newAnswers);
    setCurrentAnswer('');

    if (currentQuestionIndex < exercises.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };


  const getChildIdFromArea = (area: string): string => {
    // Determine which child based on the area
    const ethanAreas = ['timetables', 'speed-distance', 'rounding', 'decimals'];
    return ethanAreas.includes(area) ? 'ethan' : 'daniel';
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const currentExercise = exercises[currentQuestionIndex];

  if (!areaId || exercises.length === 0) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  if (!quizStarted) {
    return (
      <div className="quiz-intro">
        <div className="quiz-intro-content">
          <h1>{mathAreas[areaId as keyof typeof mathAreas]} Quiz</h1>
          <div className="quiz-info">
            <div className="quiz-details">
              <h2>Quiz Information</h2>
              <ul>
                <li><strong>Questions:</strong> 5 randomly selected</li>
                <li><strong>Time Limit:</strong> 5 minutes</li>
                <li><strong>Scoring:</strong> 1 point per correct answer</li>
                <li><strong>Format:</strong> Multiple choice and fill-in questions</li>
              </ul>
            </div>
            <div className="quiz-tips">
              <h2>Tips for Success</h2>
              <ul>
                <li>Read each question carefully</li>
                <li>Take your time, but watch the clock</li>
                <li>If unsure, make your best guess</li>
                <li>You can't go back to previous questions</li>
              </ul>
            </div>
          </div>
          <button onClick={startQuiz} className="start-quiz-button">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-results">
        <div className="results-content">
          <h1>Quiz Complete!</h1>
          <div className="score-display">
            <div 
              className="score-circle"
              style={{ borderColor: getScoreColor(quizScore) }}
            >
              <span className="score-number" style={{ color: getScoreColor(quizScore) }}>
                {quizScore}%
              </span>
            </div>
          </div>
          <div className="quiz-summary">
            <h2>Summary</h2>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Correct Answers:</span>
                <span className="stat-value">{Math.round(quizScore * exercises.length / 100)} / {exercises.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time Taken:</span>
                <span className="stat-value">{formatTime(Math.round((new Date().getTime() - startTime.getTime()) / 1000))}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Area:</span>
                <span className="stat-value">{mathAreas[areaId as keyof typeof mathAreas]}</span>
              </div>
            </div>
          </div>
          <div className="quiz-actions">
            <button 
              onClick={() => navigate(`/profile/${getChildIdFromArea(areaId)}`)}
              className="back-to-profile-button"
            >
              Back to Profile
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="retake-quiz-button"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>{mathAreas[areaId as keyof typeof mathAreas]} Quiz</h1>
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} of {exercises.length}
          </span>
        </div>
        <div className="timer">
          <span className={`time ${timeRemaining < 60 ? 'warning' : ''}`}>
            ⏰ {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p className="question">{currentExercise.question}</p>
          
          {currentExercise.type === 'multiple-choice' && (
            <div className="options">
              {currentExercise.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${currentAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {currentExercise.type === 'fill-in' && (
            <div className="fill-in">
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="answer-input"
                onKeyDown={(e) => e.key === 'Enter' && currentAnswer && nextQuestion()}
              />
            </div>
          )}
        </div>

        <div className="quiz-actions">
          <button 
            onClick={nextQuestion}
            disabled={!currentAnswer}
            className="next-question-button"
          >
            {currentQuestionIndex < exercises.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;