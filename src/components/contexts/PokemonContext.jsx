import React, { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === pokemon.id)
        ? prev.filter((fav) => fav.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  return (
    <PokemonContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};