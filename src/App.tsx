import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Exercise from './pages/Exercise';
import Quiz from './pages/Quiz';
import ParentDashboard from './pages/ParentDashboard';
import MathRacing from './pages/MathRacing';
import ResourceLibrary from './pages/ResourceLibrary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:childId" element={<Profile />} />
            <Route path="/exercise/:areaId" element={<Exercise />} />
            <Route path="/quiz/:areaId" element={<Quiz />} />
            <Route path="/racing/:areaId" element={<MathRacing />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/resources" element={<ResourceLibrary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
