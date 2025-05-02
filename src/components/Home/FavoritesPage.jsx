import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { PokemonContext } from '../contexts/PokemonContext';
import Card from '../Card';

const FavoritesPage = () => {
  const { favorites } = useContext(PokemonContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 md:p-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center mb-8 text-blue-300 hover:text-blue-100 transition-colors"
      >
        <FaArrowLeft className="h-5 w-5 mr-2" />
        Back to Pokédex
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-10 drop-shadow-lg">
        ✨ Favorite Pokémon ✨
      </h1>

      {/* No Favorites */}
      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-300 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg">
          You haven't added any favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
