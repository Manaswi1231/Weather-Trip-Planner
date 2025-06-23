import React, { useState } from "react";
import WeatherForecast from "./WeatherForecast";
import MapView from "./MapView";
import PlacesList from "./PlacesList";
import ItineraryPlanner from "./ItineraryPlanner";

const SearchPage = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) setSubmitted(true);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {submitted && (
        <>
          <WeatherForecast city={city} />
          <MapView city={city} />
          <PlacesList city={city} />
          <ItineraryPlanner city={city} />
        </>
      )}
    </div>
  );
};

export default SearchPage;
