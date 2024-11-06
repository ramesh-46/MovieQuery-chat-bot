import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;