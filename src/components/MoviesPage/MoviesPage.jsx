import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesPage.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("marvel");
  const apiKey = "9csbdf53b569bd392d33a38db8e6cab6";

  const fetchMovies = async (query = "marvel") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Invalid API key. Please check your API key."
            : "Failed to fetch movies. Please try again later."
        );
      }
      const data = await response.json();
      if (data.results) {
        setMovies(data.results);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMovies = debounce((query) => {
    if (query.trim()) {
      fetchMovies(query);
    } else {
      fetchMovies("marvel");
    }
  }, 500);

  useEffect(() => {
    debouncedFetchMovies(searchQuery);
    return () => debouncedFetchMovies.cancel();
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchMovies(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("marvel");
    fetchMovies("marvel");
  };

  return (
    <div className="movies-page">
      <h2>Movies</h2>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          aria-label="Search for movies"
        />
        <button type="submit" aria-label="Search movies">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          Clear
        </button>
      </form>
      {!searchQuery.trim() && (
        <p className="info-message">Type something to search for movies.</p>
      )}
      {loading && <p className="loading">Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
