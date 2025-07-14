import React from 'react';
import { useChildrenData } from '../hooks/useChildrenData';
import { mathAreas } from '../utils/childrenData';

const FamilyAnalytics: React.FC = () => {
  const { childrenData, quizResults } = useChildrenData();
  
  const children = Object.values(childrenData);

  const getAreaPerformanceComparison = () => {
    const areaComparison: Record<string, { ethan: number; daniel: number; averageScore: number }> = {};
    
    // Get all unique areas from both children
    const allAreas = Array.from(new Set([...children[0].strugglingAreas, ...children[1].strugglingAreas]));
    
    allAreas.forEach(area => {
      const ethanQuizzes = quizResults.filter(quiz => quiz.childId === 'ethan' && quiz.area === area);
      const danielQuizzes = quizResults.filter(quiz => quiz.childId === 'daniel' && quiz.area === area);
      
      const ethanAvg = ethanQuizzes.length > 0 
        ? ethanQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / ethanQuizzes.length
        : 0;
      
      const danielAvg = danielQuizzes.length > 0 
        ? danielQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / danielQuizzes.length
        : 0;
      
      const overallAvg = (ethanAvg + danielAvg) / 2;
      
      areaComparison[area] = {
        ethan: Math.round(ethanAvg),
        daniel: Math.round(danielAvg),
        averageScore: Math.round(overallAvg)
      };
    });
    
    return areaComparison;
  };

  const getTimeDistribution = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();

    return last7Days.map(dateString => {
      const dayQuizzes = quizResults.filter(quiz => 
        new Date(quiz.date).toDateString() === dateString
      );
      
      const totalTime = dayQuizzes.reduce((sum, quiz) => sum + quiz.timeSpent, 0);
      const date = new Date(dateString);
      
      return {
        date: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }),
        fullDate: dateString,
        timeSpent: Math.round(totalTime / 60), // Convert to minutes
        quizCount: dayQuizzes.length,
        ethanTime: Math.round(dayQuizzes.filter(q => q.childId === 'ethan').reduce((sum, quiz) => sum + quiz.timeSpent, 0) / 60),
        danielTime: Math.round(dayQuizzes.filter(q => q.childId === 'daniel').reduce((sum, quiz) => sum + quiz.timeSpent, 0) / 60)
      };
    });
  };


  const getStrengthsAndWeaknesses = () => {
    const analysis: Record<string, { strengths: string[]; weaknesses: string[]; recommendations: string[] }> = {};
    
    children.forEach(child => {
      const childQuizzes = quizResults.filter(quiz => quiz.childId === child.id);
      const strengths: string[] = [];
      const weaknesses: string[] = [];
      const recommendations: string[] = [];
      
      child.strugglingAreas.forEach(area => {
        const progress = child.progress[area] || 0;
        const areaQuizzes = childQuizzes.filter(quiz => quiz.area === area);
        const areaAverage = areaQuizzes.length > 0 
          ? areaQuizzes.reduce((sum, quiz) => sum + (quiz.score / quiz.totalQuestions * 100), 0) / areaQuizzes.length
          : 0;
        
        if (progress >= 70 || areaAverage >= 75) {
          strengths.push(mathAreas[area as keyof typeof mathAreas]);
        } else if (progress < 40 || areaAverage < 50) {
          weaknesses.push(mathAreas[area as keyof typeof mathAreas]);
          recommendations.push(`Focus on ${mathAreas[area as keyof typeof mathAreas]} with additional practice`);
        }
      });
      
      // Add general recommendations based on activity
      const recentActivity = childQuizzes.filter(quiz => {
        const daysDiff = (new Date().getTime() - new Date(quiz.date).getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 7;
      });
      
      if (recentActivity.length === 0) {
        recommendations.push('Establish a regular study routine with daily practice');
      } else if (recentActivity.length < 3) {
        recommendations.push('Try to take at least one quiz per day for better progress');
      }
      
      analysis[child.id] = { strengths, weaknesses, recommendations: recommendations.slice(0, 3) };
    });
    
    return analysis;
  };

  const areaComparison = getAreaPerformanceComparison();
  const timeDistribution = getTimeDistribution();
  const strengthsWeaknesses = getStrengthsAndWeaknesses();

  return (
    <div className="family-analytics">
      <h2>Family Learning Analytics</h2>
      
      {/* Area Performance Comparison */}
      <div className="analytics-section">
        <h3>Area Performance Comparison</h3>
        <div className="area-comparison-chart">
          {Object.entries(areaComparison).map(([area, data]) => (
            <div key={area} className="comparison-row">
              <div className="area-label">
                {mathAreas[area as keyof typeof mathAreas]}
              </div>
              <div className="comparison-bars">
                <div className="child-bar">
                  <span className="child-name">Ethan</span>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill ethan-bar" 
                      style={{ width: `${data.ethan}%` }}
                    />
                  </div>
                  <span className="score-label">{data.ethan}%</span>
                </div>
                <div className="child-bar">
                  <span className="child-name">Daniel</span>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill daniel-bar" 
                      style={{ width: `${data.daniel}%` }}
                    />
                  </div>
                  <span className="score-label">{data.daniel}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="analytics-section">
        <h3>Weekly Practice Time Distribution</h3>
        <div className="time-distribution-chart">
          {timeDistribution.map((day, index) => (
            <div key={index} className="time-day-column">
              <div className="time-day-header">
                <span className="time-day-name">{day.date}</span>
              </div>
              <div className="time-bars">
                <div 
                  className="time-bar ethan-time" 
                  style={{ height: `${Math.max(day.ethanTime * 4, 2)}px` }}
                  title={`Ethan: ${day.ethanTime} minutes`}
                />
                <div 
                  className="time-bar daniel-time" 
                  style={{ height: `${Math.max(day.danielTime * 4, 2)}px` }}
                  title={`Daniel: ${day.danielTime} minutes`}
                />
              </div>
              <div className="time-stats">
                <span className="total-time">{day.timeSpent}m</span>
              </div>
            </div>
          ))}
        </div>
        <div className="time-legend">
          <div className="legend-item">
            <div className="legend-color ethan-color"></div>
            <span>Ethan</span>
          </div>
          <div className="legend-item">
            <div className="legend-color daniel-color"></div>
            <span>Daniel</span>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="analytics-section">
        <h3>Individual Analysis</h3>
        <div className="strengths-weaknesses">
          {children.map(child => {
            const analysis = strengthsWeaknesses[child.id];
            return (
              <div key={child.id} className="child-analysis">
                <h4>{child.name}</h4>
                
                {analysis.strengths.length > 0 && (
                  <div className="analysis-group strengths">
                    <h5>🌟 Strengths</h5>
                    <ul>
                      {analysis.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.weaknesses.length > 0 && (
                  <div className="analysis-group weaknesses">
                    <h5>📝 Areas for Improvement</h5>
                    <ul>
                      {analysis.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysis.recommendations.length > 0 && (
                  <div className="analysis-group recommendations">
                    <h5>💡 Recommendations</h5>
                    <ul>
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FamilyAnalytics;