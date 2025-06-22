import React, { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_KEY = "9VRGUSBEALL84NU6L3WFJ5WXC";

const WeatherForecast = ({ lat, lon }) => {
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${WEATHER_API_KEY}`
        );
        setForecast(res.data.daily.slice(0, 7));
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon]);

  const formatDate = (dt) => {
    const d = new Date(dt * 1000);
    return d.toDateString();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow mt-6">
      {}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {forecast.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(day)}
            className="border p-2 rounded hover:bg-blue-100 min-w-[120px]"
          >
            <div className="font-semibold">{formatDate(day.dt)}</div>
            <div className="text-sm text-gray-600">
              {day.weather[0].main} - {Math.round(day.temp.day)}°C
            </div>
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-lg">
            Weather on {formatDate(selectedDay.dt)}
          </h4>
          <p>🌡 Temp: {selectedDay.temp.day} °C</p>
          <p>💨 Wind: {selectedDay.wind_speed} m/s</p>
          <p>💧 Humidity: {selectedDay.humidity}%</p>
          <p>📋 Condition: {selectedDay.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
