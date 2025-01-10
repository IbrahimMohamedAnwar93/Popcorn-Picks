import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import "./LandingPage.css";
import searchIcon from "../../assets/Images/search-icon.png";

const LandingPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    }, 500);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  return (
    <>
      {showSearch && (
        <>
          <div
            className="search-modal-overlay"
            onClick={() => setShowSearch(false)}
          />
          <div className="search-modal">
            <button
              className="close-button"
              aria-label="Close Search"
              onClick={() => setShowSearch(false)}
            >
              X
            </button>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Movies"
              />
              {searchQuery && (
                <button
                  className="clear-search-button"
                  aria-label="Clear Search"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  X
                </button>
              )}
            </div>
            {loading && (
              <div className="spinner" aria-live="polite">
                Loading...
              </div>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="search-results">
              {searchResults.length === 0 && !loading && (
                <p className="info-message">No movies found.</p>
              )}
              {searchResults.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  onClick={() => setShowSearch(false)}
                >
                  <div className="search-result-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="landing-page">
        <nav className="nav-menu">
          <ul>
            <li className="nav-item">
              <img
                src={searchIcon}
                alt="Search Icon"
                className="search-icon"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Open Search"
              />
            </li>
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <h1>Popcorn Picks</h1>
        </div>
        <div className="cta">
          <h2>Explore the best movies of all time</h2>
          <Link to="/movies" className="cta-button">
            Watch Now
          </Link>
        </div>
        <div className="background-image" />
      </div>
    </>
  );
};

export default LandingPage;
