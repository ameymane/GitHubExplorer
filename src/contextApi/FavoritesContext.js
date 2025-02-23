import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFavorite = repo => {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(fav => fav.id === repo.id);
      return exists ? prevFavorites.filter(fav => fav.id !== repo.id) : [...prevFavorites, repo];
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isDarkMode, toggleDarkMode }}>
      {children}
    </FavoritesContext.Provider>
  );
};
