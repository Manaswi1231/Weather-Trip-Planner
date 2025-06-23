import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">⭐ Your Favorite Places</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven’t saved any places yet. Visit a location and click "Save to
          Favorites"!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((place, idx) => (
            <div
              key={idx}
              className="p-4 border rounded shadow bg-white flex flex-col"
            >
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
              <p className="text-xs text-blue-600 mt-1">
                Category: {place.properties.categories?.[0] || "N/A"}
              </p>

              <button
                onClick={() => removeFavorite(place)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
