import React, { useState } from "react";
import { useItinerary } from "../context/ItineraryContext";

const ItineraryPage = () => {
  const { itinerary, setItinerary } = useItinerary();
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddItinerary = () => {
    if (place.trim() === "") return;

    const newEntry = { place, notes };
    setItinerary([...itinerary, newEntry]);
    setPlace("");
    setNotes("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Travel Itinerary</h2>

      {/* Input Section */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Enter place name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Enter notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={handleAddItinerary}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Itinerary
        </button>
      </div>

      {/* Itinerary List */}
      {itinerary.length === 0 ? (
        <p className="text-gray-600">No itinerary planned yet.</p>
      ) : (
        <ul className="space-y-4">
          {itinerary.map((item, index) => (
            <li
              key={index}
              className="bg-white p-4 shadow-md rounded border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold">Day {index + 1}</h3>
              <p className="text-gray-700 mt-1">{item.place}</p>
              <p className="text-sm text-gray-500">{item.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItineraryPage;
