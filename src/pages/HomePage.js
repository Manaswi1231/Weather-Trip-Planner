import React, { useState } from "react";
import Greeting from "../components/Greeting";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchedLocation, setSearchedLocation] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (location) => {
    setSearchedLocation(location);
  };

  const handleNavigate = (type) => {
    navigate(`/${type}?location=${searchedLocation}`);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Weather Trip Planner</h1>
        <p className="text-lg text-gray-700 mb-6">Plan Smart. Travel Better.</p>
        <button
          onClick={() => setStarted(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Click to Start Your Journey
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Greeting />
      <SearchBar onSearch={handleSearch} />

      {searchedLocation && (
        <div className="mt-4 space-y-3">
          <button
            onClick={() => handleNavigate("weather")}
            className="block w-full bg-green-500 text-white p-3 rounded"
          >
            Weather Details
          </button>
          <button
            onClick={() => handleNavigate("route-map")}
            className="block w-full bg-blue-500 text-white p-3 rounded"
          >
            Route Map
          </button>
          <button
            onClick={() => handleNavigate("places")}
            className="block w-full bg-purple-500 text-white p-3 rounded"
          >
            Visiting Places
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
