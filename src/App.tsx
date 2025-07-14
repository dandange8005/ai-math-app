import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Exercise from './pages/Exercise';
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
