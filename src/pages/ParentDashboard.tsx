import React from 'react';
import { Link } from 'react-router-dom';
import { useChildrenData } from '../hooks/useChildrenData';
import { mathAreas } from '../utils/childrenData';
import FamilyAnalytics from '../components/FamilyAnalytics';

const ParentDashboard: React.FC = () => {
  const { childrenData, quizResults, getTodaysStats, getChildQuizResults } = useChildrenData();

  const children = Object.values(childrenData);

  const getOverallFamilyStats = () => {
    const totalQuizzes = quizResults.length;
    const totalTimeSpent = quizResults.reduce((sum, quiz) => sum + quiz.timeSpent, 0);
    
    // Calculate overall progress across all children and areas
    const allProgress = children.flatMap(child => 
      child.strugglingAreas.map(area => child.progress[area] || 0)
    );
    const averageProgress = allProgress.length > 0 
      ? allProgress.reduce((sum, progress) => sum + progress, 0) / allProgress.length 
      : 0;

    // Calculate overall quiz performance
    const averageQuizScore = totalQuizzes > 0
      ? quizResults.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / totalQuizzes
      : 0;

    return {
      averageProgress: Math.round(averageProgress),
      totalQuizzes,
      averageQuizScore: Math.round(averageQuizScore),
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      activeChildren: children.length
    };
  };

  const getChildComparison = () => {
    return children.map(child => {
      const childQuizzes = getChildQuizResults(child.id);
      const todaysStats = getTodaysStats(child.id);
      
      // Calculate child's overall progress
      const childProgress = child.strugglingAreas.reduce((sum, area) => sum + (child.progress[area] || 0), 0) / child.strugglingAreas.length;
      
      // Calculate recent performance (last 7 days)
      const recentQuizzes = childQuizzes.filter(quiz => {
        const daysDiff = (new Date().getTime() - new Date(quiz.date).getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 7;
      });
      
      const recentAverage = recentQuizzes.length > 0
        ? recentQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / recentQuizzes.length
        : 0;

      return {
        ...child,
        overallProgress: Math.round(childProgress),
        recentQuizzes: recentQuizzes.length,
        recentAverage: Math.round(recentAverage),
        todaysStats,
        strugglingAreasCount: child.strugglingAreas.length,
        mostRecentActivity: childQuizzes[0]?.date || null
      };
    });
  };

  const getWeeklyTrends = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const weekData = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (today.getDay() - 1) + index);
      
      const dayQuizzes = quizResults.filter(quiz => {
        const quizDate = new Date(quiz.date);
        return quizDate.toDateString() === date.toDateString();
      });

      return {
        day,
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        quizzes: dayQuizzes.length,
        averageScore: dayQuizzes.length > 0
          ? Math.round(dayQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / dayQuizzes.length)
          : 0
      };
    });

    return weekData;
  };

  const getRecommendations = () => {
    const recommendations: string[] = [];
    const childComparison = getChildComparison();

    childComparison.forEach(child => {
      // Check for low progress areas
      const lowProgressAreas = child.strugglingAreas.filter(area => (child.progress[area] || 0) < 40);
      if (lowProgressAreas.length > 0) {
        recommendations.push(
          `${child.name} needs extra practice in ${lowProgressAreas.map(area => mathAreas[area as keyof typeof mathAreas]).join(', ')}`
        );
      }

      // Check for inactivity
      if (child.recentQuizzes === 0) {
        recommendations.push(`Encourage ${child.name} to take a quiz this week`);
      }

      // Check for improvement opportunities
      if (child.recentAverage < 60 && child.recentQuizzes > 0) {
        recommendations.push(`${child.name} could benefit from reviewing quiz explanations before retaking assessments`);
      }
    });

    // General recommendations
    if (getOverallFamilyStats().totalQuizzes < 5) {
      recommendations.push('Try to establish a regular practice routine with daily 10-15 minute sessions');
    }

    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  };

  const familyStats = getOverallFamilyStats();
  const childComparison = getChildComparison();
  const weeklyTrends = getWeeklyTrends();
  const recommendations = getRecommendations();

  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <p>Monitor Ethan and Daniel's math learning progress</p>
      </div>

      {/* Family Overview Stats */}
      <div className="family-overview">
        <h2>Family Overview</h2>
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-icon">👨‍👩‍👧‍👦</div>
            <div className="stat-content">
              <h3>{familyStats.activeChildren}</h3>
              <p>Active Learners</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{familyStats.averageProgress}%</h3>
              <p>Average Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{familyStats.averageQuizScore}%</h3>
              <p>Average Quiz Score</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>{familyStats.totalQuizzes}</h3>
              <p>Total Quizzes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>{familyStats.totalTimeSpent}m</h3>
              <p>Practice Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Child Comparison */}
      <div className="child-comparison">
        <h2>Children Progress Comparison</h2>
        <div className="comparison-grid">
          {childComparison.map(child => (
            <div key={child.id} className="child-summary-card">
              <div className="child-header">
                <h3>{child.name}</h3>
                <span className="child-details">Age {child.age} • Year {child.grade}</span>
              </div>
              
              <div className="child-metrics">
                <div className="metric">
                  <span className="metric-label">Overall Progress</span>
                  <div className="progress-visual">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${child.overallProgress}%`,
                        backgroundColor: child.overallProgress >= 80 ? '#27ae60' : 
                                       child.overallProgress >= 60 ? '#f39c12' : 
                                       child.overallProgress >= 40 ? '#e67e22' : '#e74c3c'
                      }}
                    />
                  </div>
                  <span className="metric-value">{child.overallProgress}%</span>
                </div>

                <div className="metric">
                  <span className="metric-label">Recent Activity (7 days)</span>
                  <span className="metric-value">{child.recentQuizzes} quizzes</span>
                </div>

                <div className="metric">
                  <span className="metric-label">Recent Average</span>
                  <span className="metric-value">{child.recentAverage}%</span>
                </div>

                <div className="metric">
                  <span className="metric-label">Focus Areas</span>
                  <span className="metric-value">{child.strugglingAreasCount} areas</span>
                </div>
              </div>

              <div className="child-actions">
                <Link to={`/profile/${child.id}`} className="view-profile-btn">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Trends */}
      <div className="weekly-trends">
        <h2>This Week's Activity</h2>
        <div className="trends-chart">
          {weeklyTrends.map((day, index) => (
            <div key={index} className="day-column">
              <div className="day-header">
                <span className="day-name">{day.day}</span>
                <span className="day-date">{day.date}</span>
              </div>
              <div className="activity-bar">
                <div 
                  className="quiz-bar" 
                  style={{ 
                    height: `${Math.max(day.quizzes * 20, 5)}px`,
                    backgroundColor: day.quizzes > 0 ? '#3498db' : '#ecf0f1'
                  }}
                  title={`${day.quizzes} quizzes${day.averageScore > 0 ? `, ${day.averageScore}% avg` : ''}`}
                />
              </div>
              <div className="day-stats">
                <span className="quiz-count">{day.quizzes}</span>
                {day.averageScore > 0 && (
                  <span className="avg-score">{day.averageScore}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <span>📊 Quiz activity and average scores for the current week</span>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Recommendations</h2>
          <div className="recommendation-list">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-icon">💡</div>
                <p>{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Analytics */}
      <FamilyAnalytics />

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/profile/ethan" className="action-card">
            <div className="action-icon">👦</div>
            <h3>Ethan's Profile</h3>
            <p>View detailed progress and take quizzes</p>
          </Link>
          <Link to="/profile/daniel" className="action-card">
            <div className="action-icon">🧒</div>
            <h3>Daniel's Profile</h3>
            <p>View detailed progress and take quizzes</p>
          </Link>
          <div className="action-card info-card">
            <div className="action-icon">📋</div>
            <h3>Progress Reports</h3>
            <p>Detailed reports coming soon</p>
          </div>
          <div className="action-card info-card">
            <div className="action-icon">🎮</div>
            <h3>Math Games</h3>
            <p>Interactive games coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;