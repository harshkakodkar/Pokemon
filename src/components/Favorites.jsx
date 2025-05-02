import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'; // Assuming you already have a Card component

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Favorite Pokémon</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-lg mt-10">You have no favorite Pokémon yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {/* Back to Home link */}
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 underline">
          Back to Pokémon List
        </Link>
      </div>
    </div>
  );
};

export default Favorites;
