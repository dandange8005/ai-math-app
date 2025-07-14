import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Exercise } from '../types';
import { getExercisesByArea } from '../utils/exercises';
import { mathAreas } from '../utils/childrenData';
import { useChildrenData } from '../hooks/useChildrenData';

const ExercisePage: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const { updateChildProgress } = useChildrenData();
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);

  useEffect(() => {
    if (areaId) {
      const areaExercises = getExercisesByArea(areaId);
      setExercises(areaExercises);
    }
  }, [areaId]);

  const currentExercise = exercises[currentExerciseIndex];

  const handleSubmit = () => {
    if (!currentExercise) return;
    
    const correct = userAnswer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
    setCompletedExercises(completedExercises + 1);
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      // Exercise session complete
      const finalScore = Math.round((score / exercises.length) * 100);
      
      // Update progress for both children (we'll determine which child later)
      updateChildProgress('ethan', areaId!, finalScore);
      updateChildProgress('daniel', areaId!, finalScore);
      
      navigate('/');
    }
  };

  const handleOptionSelect = (option: string) => {
    setUserAnswer(option);
  };

  if (!currentExercise) {
    return <div>Loading exercises...</div>;
  }

  return (
    <div className="exercise-page">
      <div className="exercise-header">
        <h1>{mathAreas[areaId as keyof typeof mathAreas]}</h1>
        <div className="progress-info">
          <span>Question {currentExerciseIndex + 1} of {exercises.length}</span>
          <span className="score">Score: {score}/{completedExercises}</span>
        </div>
      </div>

      <div className="exercise-content">
        <div className="question-card">
          <h2>Question {currentExerciseIndex + 1}</h2>
          <p className="question">{currentExercise.question}</p>
          
          {currentExercise.type === 'multiple-choice' && (
            <div className="options">
              {currentExercise.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${userAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
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
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={showFeedback}
                className="answer-input"
              />
            </div>
          )}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <h3>{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
            {!isCorrect && (
              <p><strong>Correct answer:</strong> {currentExercise.correctAnswer}</p>
            )}
            <p><strong>Explanation:</strong> {currentExercise.explanation}</p>
          </div>
        )}

        <div className="exercise-actions">
          {!showFeedback ? (
            <button 
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="submit-button"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="next-button">
              {currentExerciseIndex < exercises.length - 1 ? 'Next Question' : 'Complete Exercise'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;