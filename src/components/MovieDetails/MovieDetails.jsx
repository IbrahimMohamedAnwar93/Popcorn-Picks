import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  const navigate = useNavigate();

  const addToFavorites = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some((fav) => fav.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to Favorites!");
      } else {
        alert("Movie already in Favorites!");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      alert("Failed to add to Favorites. Please try again.");
    }
  };

  if (!movie) {
    return <div className="movie-details">No movie data available.</div>;
  }

  const {
    Poster = "https://via.placeholder.com/300",
    Title,
    Year = "Unknown",
    Plot = "Plot information is not available.",
  } = movie;

  return (
    <div className="movie-details">
      <img src={Poster} alt={`Poster for ${Title} (${Year})`} />
      <h2>{Title}</h2>
      <p>{Year}</p>
      <p>{Plot}</p>
      <button onClick={addToFavorites} aria-label={`Add ${Title} to Favorites`}>
        Add to Favorites
      </button>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    Plot: PropTypes.string,
  }).isRequired,
};

export default MovieDetails;
