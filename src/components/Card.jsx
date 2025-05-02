import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from './contexts/PokemonContext';
import { HeartIcon } from '@heroicons/react/solid';

const Card = ({ pokemon }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const isFavorite = favorites.some(fav => fav.id === pokemon.id);

  // Type color mapping
  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-400">
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Favorite button */}
      <button
        onClick={() => toggleFavorite(pokemon)}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
          isFavorite 
            ? 'bg-red-500/90 hover:bg-red-600/90 shadow-lg shadow-red-500/30' 
            : 'bg-gray-800/80 hover:bg-red-500/80 border border-gray-700'
        }`}
      >
        <HeartIcon className={`h-5 w-5 transition-colors ${
          isFavorite ? 'text-white' : 'text-gray-400 group-hover:text-white'
        }`} />
      </button>

      {/* Pokemon Image */}
      <div className="p-6 pb-0 flex justify-center">
        <div className="relative w-40 h-40">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-4 text-center">
        <p className="text-blue-400 font-mono text-sm mb-1">#{pokemon.id.toString().padStart(3, '0')}</p>
        <h3 className="text-xl font-bold text-white capitalize mb-3">
          {pokemon.name}
        </h3>
        
        {/* Types */}
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.slot}
              className={`${typeColors[typeInfo.type.name] || 'bg-gray-600'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        {/* View Details button */}
        <button
          onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          className="mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
