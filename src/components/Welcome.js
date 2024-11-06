import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">
        Welcome to MovieQuery
      </h1>
      <p className="welcome-subtitle">Your personal movie information assistant</p>
      <Link to="/chat" className="get-started-btn">
        Get Started
      </Link>
    </div>
  );
}

export default Welcome;