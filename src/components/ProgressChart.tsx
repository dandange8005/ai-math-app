import React from 'react';
import { useChildrenData } from '../hooks/useChildrenData';
import { mathAreas } from '../utils/childrenData';

interface ProgressChartProps {
  childId: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ childId }) => {
  const { childrenData, getChildQuizResults } = useChildrenData();
  
  const child = childrenData[childId];
  const quizResults = getChildQuizResults(childId);

  if (!child) return null;

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return '#27ae60';
    if (progress >= 60) return '#f39c12';
    if (progress >= 40) return '#e67e22';
    return '#e74c3c';
  };

  const getRecentActivity = () => {
    const recent = quizResults
      .filter(result => {
        const daysDiff = (new Date().getTime() - new Date(result.date).getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 7;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return recent.slice(0, 5);
  };

  const getAreaStats = (areaId: string) => {
    const areaQuizzes = quizResults.filter(result => result.area === areaId);
    if (areaQuizzes.length === 0) return { averageScore: 0, attempts: 0, improvement: 0 };

    const averageScore = areaQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / areaQuizzes.length;
    const attempts = areaQuizzes.length;
    
    // Calculate improvement (compare first and last quiz)
    let improvement = 0;
    if (areaQuizzes.length >= 2) {
      const firstScore = (areaQuizzes[areaQuizzes.length - 1].score / areaQuizzes[areaQuizzes.length - 1].totalQuestions) * 100;
      const lastScore = (areaQuizzes[0].score / areaQuizzes[0].totalQuestions) * 100;
      improvement = lastScore - firstScore;
    }

    return { averageScore: Math.round(averageScore), attempts, improvement: Math.round(improvement) };
  };

  const overallStats = () => {
    const totalProgress = child.strugglingAreas.reduce((sum, area) => sum + (child.progress[area] || 0), 0);
    const averageProgress = totalProgress / child.strugglingAreas.length;
    
    const totalQuizzes = quizResults.length;
    const averageQuizScore = totalQuizzes > 0 
      ? quizResults.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / totalQuizzes
      : 0;

    const totalTimeSpent = quizResults.reduce((sum, quiz) => sum + quiz.timeSpent, 0);

    return {
      averageProgress: Math.round(averageProgress),
      totalQuizzes,
      averageQuizScore: Math.round(averageQuizScore),
      totalTimeSpent: Math.round(totalTimeSpent / 60) // Convert to minutes
    };
  };

  const stats = overallStats();
  const recentActivity = getRecentActivity();

  return (
    <div className="progress-chart">
      <h2>Progress Overview</h2>
      
      {/* Overall Stats */}
      <div className="overall-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.averageProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{stats.totalQuizzes}</h3>
            <p>Quizzes Taken</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.averageQuizScore}%</h3>
            <p>Quiz Average</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{stats.totalTimeSpent}m</h3>
            <p>Time Practiced</p>
          </div>
        </div>
      </div>

      {/* Area Progress Bars */}
      <div className="area-progress">
        <h3>Progress by Area</h3>
        {child.strugglingAreas.map((areaId) => {
          const progress = child.progress[areaId] || 0;
          const areaStats = getAreaStats(areaId);
          
          return (
            <div key={areaId} className="area-progress-item">
              <div className="area-header">
                <span className="area-name">{mathAreas[areaId as keyof typeof mathAreas]}</span>
                <div className="area-metrics">
                  <span className="progress-percentage">{progress}%</span>
                  {areaStats.attempts > 0 && (
                    <span className="quiz-info">
                      {areaStats.attempts} quiz{areaStats.attempts !== 1 ? 'es' : ''} • {areaStats.averageScore}% avg
                      {areaStats.improvement !== 0 && (
                        <span className={`improvement ${areaStats.improvement > 0 ? 'positive' : 'negative'}`}>
                          {areaStats.improvement > 0 ? '+' : ''}{areaStats.improvement}%
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: getProgressColor(progress)
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="recent-activity">
          <h3>Recent Activity (Last 7 Days)</h3>
          <div className="activity-list">
            {recentActivity.map((activity) => {
              const score = Math.round((activity.score / activity.totalQuestions) * 100);
              const date = new Date(activity.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              
              return (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📝'}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">
                      {mathAreas[activity.area as keyof typeof mathAreas]} Quiz
                    </div>
                    <div className="activity-details">
                      {dayName} • {activity.score}/{activity.totalQuestions} correct • {score}%
                    </div>
                  </div>
                  <div className="activity-score" style={{ color: getProgressColor(score) }}>
                    {score}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Messages */}
      <div className="motivation-section">
        {stats.averageProgress >= 80 && (
          <div className="motivation-message excellent">
            <span className="motivation-icon">🌟</span>
            <p>Excellent work! You're mastering these math skills!</p>
          </div>
        )}
        {stats.averageProgress >= 60 && stats.averageProgress < 80 && (
          <div className="motivation-message good">
            <span className="motivation-icon">👏</span>
            <p>Great progress! Keep practicing to reach mastery!</p>
          </div>
        )}
        {stats.averageProgress < 60 && stats.totalQuizzes > 0 && (
          <div className="motivation-message encourage">
            <span className="motivation-icon">💪</span>
            <p>Keep going! Every practice session helps you improve!</p>
          </div>
        )}
        {stats.totalQuizzes === 0 && (
          <div className="motivation-message start">
            <span className="motivation-icon">🚀</span>
            <p>Ready to start your math journey? Take your first quiz!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;