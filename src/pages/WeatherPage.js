import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const WeatherPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("location") || "";

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "9VRGUSBEALL84NU6L3WFJ5WXC";

  const handleFetchWeather = async () => {
    if (!fromDate || !toDate || !city) {
      setError("Please enter all fields.");
      return;
    }

    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        city
      )}/${fromDate}/${toDate}?unitGroup=metric&key=${API_KEY}&include=days`;

      const response = await axios.get(url);
      const days = response.data.days || [];

      if (days.length === 0) {
        setError("No weather data available for that range.");
        setForecastData([]);
      } else {
        setForecastData(days);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data. Please check your inputs.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Weather Forecast for {city}</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleFetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Forecast
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forecastData.map((day, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <p className="font-semibold">{day.datetime}</p>
            <p>🌡️ Temp: {day.temp}°C</p>
            <p>🌦️ Conditions: {day.conditions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
