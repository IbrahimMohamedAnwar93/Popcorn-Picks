import React from "react";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  let favorites = [];

  try {
    favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (error) {
    console.error("Error parsing favorites from localStorage:", error);
  }

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((movie) => {
            const { id, Poster, Title, Year } = movie;
            return (
              <div key={id} className="favorite-movie">
                <img src={Poster} alt={`Poster for ${Title}`} loading="lazy" />
                <h3>{Title}</h3>
                <p>{Year}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No favorites added yet!</p>
      )}
    </div>
  );
};

export default FavoritesPage;
