import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>AI Math Helper</h1>
      <p>Welcome to your personalized math learning app!</p>
      <div className="child-selection">
        <h2>Choose Your Profile</h2>
        <div className="profile-cards">
          <Link to="/profile/ethan" className="profile-card">
            <h3>Ethan</h3>
            <p>Time problems, Speed/Distance, Rounding, Decimals</p>
          </Link>
          <Link to="/profile/daniel" className="profile-card">
            <h3>Daniel</h3>
            <p>Thermometer scales, Time fractions, Multiplication/Division</p>
          </Link>
        </div>
      </div>
      <div className="quick-actions">
        <Link to="/parent-dashboard" className="action-button">
          Parent Dashboard
        </Link>
        <Link to="/resources" className="action-button">
          Resources
        </Link>
      </div>
    </div>
  );
};

export default Home;