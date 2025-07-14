import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          AI Math Helper
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/profile/ethan" 
            className={location.pathname.includes('/profile/ethan') ? 'active' : ''}
          >
            Ethan
          </Link>
          <Link 
            to="/profile/daniel" 
            className={location.pathname.includes('/profile/daniel') ? 'active' : ''}
          >
            Daniel
          </Link>
          <Link 
            to="/parent-dashboard" 
            className={location.pathname === '/parent-dashboard' ? 'active' : ''}
          >
            Parent Dashboard
          </Link>
          <Link 
            to="/resources" 
            className={location.pathname === '/resources' ? 'active' : ''}
          >
            Resources
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;