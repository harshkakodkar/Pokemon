import React from 'react';

const RandomButton = ({ originalPokemons, setDisplayedPokemons, setCurrentPage }) => {
  const handleRandomClick = () => {
    if (originalPokemons.length === 0) return;

    // Create a copy of the original array
    const shuffled = [...originalPokemons];
    
    // Modern Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setDisplayedPokemons(shuffled);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-center w-full px-4 mt-4 sm:mt-6">
      <button
        onClick={handleRandomClick}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium sm:font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-sm sm:text-base"
      >
        Randomize Pokémon
      </button>
    </div>
  );
};

export default RandomButton;