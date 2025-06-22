import React, { useState } from "react";

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState([{ day: 1, places: [""] }]);

  const addDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, places: [""] }]);
  };

  const updatePlace = (dayIndex, placeIndex, value) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].places[placeIndex] = value;
    setItinerary(newItinerary);
  };

  const addPlace = (dayIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].places.push("");
    setItinerary(newItinerary);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 Travel Itinerary Planner</h2>

      {itinerary.map((dayItem, dayIndex) => (
        <div key={dayIndex} className="mb-6 p-4 border rounded shadow bg-white">
          <h3 className="text-xl font-semibold mb-2">Day {dayItem.day}</h3>
          {dayItem.places.map((place, placeIndex) => (
            <input
              key={placeIndex}
              type="text"
              value={place}
              placeholder={`Place ${placeIndex + 1}`}
              onChange={(e) =>
                updatePlace(dayIndex, placeIndex, e.target.value)
              }
              className="block w-full mb-2 p-2 border rounded"
            />
          ))}
          <button
            onClick={() => addPlace(dayIndex)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Place
          </button>
        </div>
      ))}

      <button
        onClick={addDay}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ➕ Add Day
      </button>
    </div>
  );
};

export default ItineraryPlanner;
