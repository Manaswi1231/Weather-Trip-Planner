import React from "react";
import { useItinerary } from "../context/ItineraryContext";

const ItineraryPage = () => {
  const { itinerary } = useItinerary();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Travel Itinerary</h2>
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
