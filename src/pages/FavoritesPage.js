import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Favorite Places</h2>
      {favorites.length === 0 ? (
        <p>No favorites saved yet.</p>
      ) : (
        favorites.map((place) => (
          <div key={place.name} style={{ marginBottom: "15px" }}>
            <h4>{place.name}</h4>
            <p>{place.description}</p>
            <button onClick={() => removeFavorite(place.name)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
