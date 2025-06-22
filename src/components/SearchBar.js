import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== "") onSearch(location);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Enter a location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
