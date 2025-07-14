import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChildrenData } from '../hooks/useChildrenData';
import { mathAreas } from '../utils/childrenData';
import ProgressChart from '../components/ProgressChart';

const Profile: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { childrenData, getTodaysStats } = useChildrenData();
  
  const child = childrenData[childId!];
  const todaysStats = getTodaysStats(childId!);

  if (!child) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile">
      <h1>{child.name}'s Learning Dashboard</h1>
      <div className="progress-overview">
        <h2>Math Areas to Practice</h2>
        <div className="area-grid">
          {child.strugglingAreas.map((areaId) => (
            <div key={areaId} className="area-card">
              <h3>{mathAreas[areaId as keyof typeof mathAreas]}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${child.progress[areaId] || 0}%` }}
                />
              </div>
              <p>{child.progress[areaId] || 0}% Complete</p>
              <div className="area-actions">
                <Link to={`/exercise/${areaId}`} className="practice-button">
                  Practice
                </Link>
                <Link to={`/quiz/${areaId}`} className="quiz-button">
                  Take Quiz
                </Link>
                <Link to={`/racing/${areaId}`} className="racing-button">
                  🏎️ Racing
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="quick-stats">
        <h2>Today's Progress</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{todaysStats.exercisesCompleted}</h3>
            <p>Exercises Completed</p>
          </div>
          <div className="stat-card">
            <h3>{todaysStats.quizzesTaken}</h3>
            <p>Quizzes Taken</p>
          </div>
          <div className="stat-card">
            <h3>{Math.round(todaysStats.minutesPracticed / 60)}</h3>
            <p>Minutes Practiced</p>
          </div>
        </div>
      </div>
      
      <ProgressChart childId={childId!} />
    </div>
  );
};

export default Profile;