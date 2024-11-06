import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const tmdbApiKey = 'c67a4df77b53022a9d2fcec9e076040c';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${input}`);
      const movie = response.data.results[0];
      if (movie) {
        const botMessage = { movie, user: false };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = { text: "Sorry, I couldn't find any information about that movie.", user: false };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      const botMessage = { text: "Sorry, there was an error fetching movie information.", user: false };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <Link to="/" className="back-btn">
          <FaArrowLeft size={18} />
        </Link>
        <h2>MovieQuery Chat</h2>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user-message' : 'bot-message'}`}>
            {message.user ? (
              <p>{message.text}</p>
            ) : (
              message.movie ? (
                <MovieCard movie={message.movie} />
              ) : (
                <p>{message.text}</p>
              )
            )}
          </div>
        ))}
        {isTyping && (
          <div className="message bot-message">
            <p>Searching for movie information...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a movie name..."
            className="chat-input"
          />
          <button type="submit" className="send-btn" disabled={!input.trim()}>
            <span>Send</span>
            <FaPaperPlane size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;