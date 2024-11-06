import React from 'react';
import { FaCopy, FaStar } from 'react-icons/fa';

function MovieCard({ movie }) {
  const handleCopy = () => {
    const movieInfo = `
      Title: ${movie.title}
      Release Date: ${movie.release_date}
      Rating: ${movie.vote_average}/10
      Overview: ${movie.overview}
    `;
    navigator.clipboard.writeText(movieInfo);
    alert('Movie information copied to clipboard!');
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> <FaStar className="star-icon" /> {movie.vote_average}/10</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <button onClick={handleCopy} className="copy-btn">
          <FaCopy /> Copy Info
        </button>
      </div>
    </div>
  );
}

export default MovieCard;