import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (place) => {
    if (
      !favorites.find((fav) => fav.properties.name === place.properties.name)
    ) {
      setFavorites([...favorites, place]);
    }
  };

  const removeFavorite = (placeName) => {
    setFavorites(favorites.filter((fav) => fav.properties.name !== placeName));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
