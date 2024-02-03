import React from "react";

export default function Navbar({ setQuery, query, movies }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h1>ReviewFlicks</h1>
        <span role="img">🎬</span>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  );
}
