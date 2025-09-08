import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">
      <img
        src="./assets/search.svg"
        alt="Search Icon"
        className="w-10 h-10"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        placeholder="Search for your favorite movies..."
      />
    </div>
  );
};

export default Search;
