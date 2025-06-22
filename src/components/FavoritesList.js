import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesList = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Places</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites saved yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((place, index) => (
            <li key={index} className="p-4 border rounded shadow bg-white">
              <img
                src={
                  place.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={place.properties.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{place.properties.name}</h3>
              <p className="text-sm text-gray-600">
                {place.properties.formatted}
              </p>
              <button
                onClick={() => removeFavorite(place)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
