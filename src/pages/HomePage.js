import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const [location, setLocation] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim() !== "") {
      setShowOptions(true);
    } else {
      alert("Please enter a location");
    }
  };

  const handleNavigate = (path) => {
    if (location) navigate(`/${path}?location=${location}`);
  };

  return (
    <div className="p-6 text-center min-h-screen bg-gray-100">
      {!started ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Weather Trip Planner</h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
            onClick={() => setStarted(true)}
          >
            Click to Start Your Journey
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4 font-semibold">Search your location</h2>
          <div className="flex flex-col items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter location"
              className="border px-4 py-2 rounded w-80"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {showOptions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => handleNavigate("weather")}
                className="bg-white shadow-md border p-4 rounded hover:bg-blue-50"
              >
                Check Weather
              </button>
              <button
                onClick={() => handleNavigate("route-map")}
                className="bg-white shadow-md border p-4 rounded hover:bg-blue-50"
              >
                Find Routes
              </button>
              <button
                onClick={() => handleNavigate("places")}
                className="bg-white shadow-md border p-4 rounded hover:bg-blue-50"
              >
                Tourist Places
              </button>
              <button
                onClick={() => handleNavigate("itinerary")}
                className="bg-white shadow-md border p-4 rounded hover:bg-blue-50"
              >
                Build Itinerary
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
