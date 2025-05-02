import React, { useState, useEffect } from 'react';

const TypeFilter = ({ selectedType, setSelectedType }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon',  'steel', 'fairy'
  ];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.relative')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative z-50 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border ${
          selectedType ? 'border-white/30' : 'border-white/10'
        } hover:border-blue-400 transition-all duration-300 shadow-lg`}
      >
        <div className="flex items-center">
          {selectedType ? (
            <>
              <span className={`w-3 h-3 rounded-full ${typeColors[selectedType]} mr-2`}></span>
              <span className="font-medium text-white">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              </span>
            </>
          ) : (
            <span className="text-white/70">Filter by Type</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-white/50 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full md:w-64 rounded-xl bg-gray-800/95 backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden transition-all duration-200 opacity-100 translate-y-0">
          <div className="max-h-60 overflow-y-auto custom-scrollbar ">
            <div
              onClick={() => {
                setSelectedType('');
                setIsOpen(false);
              }}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors ${
                !selectedType ? 'bg-white/20' : ''
              }`}
            >
              <span className="text-white/80">All Types</span>
            </div>
            
            {pokemonTypes.map((type) => (
              <div
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setIsOpen(false);
                }}
                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors ${
                  selectedType === type ? 'bg-white/20' : ''
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${typeColors[type]} mr-3 ` }></span>
                <span className="text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;