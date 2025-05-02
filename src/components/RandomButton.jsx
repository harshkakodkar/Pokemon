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
    <div className="text-center mt-6">
      <button
        onClick={handleRandomClick}
        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        Randomize Pokémon
      </button>
    </div>
  );
};

export default RandomButton;