import React from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { Poster, Title, Year } = movie;
  const defaultImage = "https://via.placeholder.com/300";

  return (
    <div className="movie-card">
      <img
        src={Poster || defaultImage}
        alt={`Poster of ${Title}`}
        loading="lazy"
      />
      <h3>{Title}</h3>
      <p>{Year}</p>
    </div>
  );
};

// Define PropTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
