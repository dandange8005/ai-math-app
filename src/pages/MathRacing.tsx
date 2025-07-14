import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChildrenData } from '../hooks/useChildrenData';
import { mathAreas } from '../utils/childrenData';

interface RaceQuestion {
  question: string;
  answer: number;
  options: number[];
}

const MathRacing: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { addQuizResult, updateChildProgress } = useChildrenData();
  
  const [questions, setQuestions] = useState<RaceQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const generateQuestion = useCallback((): RaceQuestion => {
    const operators = ['+', '-', '×', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1: number, num2: number, answer: number, question: string;
    
    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      case '÷':
        answer = Math.floor(Math.random() * 12) + 1;
        num1 = answer * (Math.floor(Math.random() * 12) + 1);
        num2 = num1 / answer;
        question = `${num1} ÷ ${num2}`;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
        question = '1 + 1';
    }

    // Generate wrong options
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + (Math.floor(Math.random() * 21) - 10);
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return { question, answer, options };
  }, []);

  const generateQuestions = useCallback(() => {
    const newQuestions: RaceQuestion[] = [];
    for (let i = 0; i < 100; i++) { // Generate many questions
      newQuestions.push(generateQuestion());
    }
    setQuestions(newQuestions);
  }, [generateQuestion]);

  useEffect(() => {
    generateQuestions();
  }, [generateQuestions]);

  const finishGame = useCallback(() => {
    setGameFinished(true);
    
    // Save game result as a quiz result
    const gameResult = {
      id: `racing_${Date.now()}`,
      childId: getChildIdFromArea(areaId!),
      area: areaId!,
      score: score,
      totalQuestions: answeredQuestions,
      date: new Date(),
      timeSpent: 60 - timeLeft
    };
    
    addQuizResult(gameResult);
    const progressScore = Math.round((score / Math.max(answeredQuestions, 1)) * 100);
    updateChildProgress(gameResult.childId, areaId!, progressScore);
  }, [areaId, score, answeredQuestions, timeLeft, addQuizResult, updateChildProgress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0 && !gameFinished) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameFinished, finishGame]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setCurrentQuestionIndex(0);
    setAnsweredQuestions(0);
  };

  const handleAnswer = (selectedAnswer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }
    
    setAnsweredQuestions(answeredQuestions + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };


  const getChildIdFromArea = (area: string): string => {
    const ethanAreas = ['timetables', 'speed-distance', 'rounding', 'decimals'];
    return ethanAreas.includes(area) ? 'ethan' : 'daniel';
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!areaId || questions.length === 0) {
    return <div className="game-loading">Loading Math Racing...</div>;
  }

  if (!gameStarted) {
    return (
      <div className="math-racing-intro">
        <div className="game-intro-content">
          <h1>🏎️ Math Racing</h1>
          <h2>{mathAreas[areaId as keyof typeof mathAreas]}</h2>
          <div className="game-info">
            <div className="game-rules">
              <h3>How to Play</h3>
              <ul>
                <li>Answer as many math questions as you can in 60 seconds</li>
                <li>Click the correct answer from 4 options</li>
                <li>Get points for each correct answer</li>
                <li>Build up streaks for bonus motivation!</li>
                <li>Beat your high score!</li>
              </ul>
            </div>
            <div className="game-tips">
              <h3>Tips</h3>
              <ul>
                <li>Work quickly but carefully</li>
                <li>Don't spend too long on one question</li>
                <li>Mental math skills will help you go faster</li>
                <li>Stay calm under pressure</li>
              </ul>
            </div>
          </div>
          <button onClick={startGame} className="start-game-button">
            🚀 Start Racing!
          </button>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="math-racing-results">
        <div className="results-content">
          <h1>🏁 Race Complete!</h1>
          <div className="final-stats">
            <div className="stat-card primary">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>{score}</h3>
                <p>Correct Answers</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{answeredQuestions}</h3>
                <p>Total Attempts</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <h3>{bestStreak}</h3>
                <p>Best Streak</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <h3>{answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0}%</h3>
                <p>Accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="performance-message">
            {score >= 40 && <p className="excellent">🌟 Amazing speed and accuracy!</p>}
            {score >= 25 && score < 40 && <p className="good">👏 Great job! You're getting faster!</p>}
            {score >= 15 && score < 25 && <p className="encourage">💪 Good work! Keep practicing!</p>}
            {score < 15 && <p className="motivate">🚀 Great start! Try again to improve!</p>}
          </div>

          <div className="game-actions">
            <button 
              onClick={() => navigate(`/profile/${getChildIdFromArea(areaId)}`)}
              className="back-to-profile-button"
            >
              Back to Profile
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="play-again-button"
            >
              🏎️ Race Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="math-racing-game">
      <div className="game-header">
        <h1>🏎️ Math Racing</h1>
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Time:</span>
            <span className={`stat-value ${timeLeft <= 10 ? 'warning' : ''}`}>{timeLeft}s</span>
          </div>
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Streak:</span>
            <span className={`stat-value ${streak >= 5 ? 'hot-streak' : ''}`}>{streak}</span>
          </div>
        </div>
      </div>

      <div className="question-section">
        <div className="question-card racing">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <div className="math-question">
            {currentQuestion.question} = ?
          </div>
          
          <div className="racing-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className="racing-option"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {streak >= 5 && (
        <div className="streak-celebration">
          🔥 {streak} in a row! You're on fire!
        </div>
      )}
    </div>
  );
};

export default MathRacing;