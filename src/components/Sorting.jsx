import React from 'react';

const Sorting = ({ sortOption, setSortOption }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Base button styles
  const baseButtonStyle =
    'px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-lg md:rounded-xl font-medium sm:font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 backdrop-blur-md shadow-lg whitespace-nowrap';
  
  const inactiveStyle =
    'bg-white/10 text-blue-200 border border-blue-500/50 hover:bg-blue-500/30 hover:text-white hover:border-blue-400';
  
  const activeStyle =
    'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-800/50 ring-1 sm:ring-2 ring-blue-500 backdrop-blur-md';

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-3 md:gap-4 lg:gap-6 mb-6 sm:mb-8 md:mb-10 px-2">
      {/* Sort by ID */}
      <button
        value="id"
        onClick={handleSortChange}
        className={`${baseButtonStyle} ${
          sortOption === 'id' ? activeStyle : inactiveStyle
        }`}
      >
        Sort by ID
      </button>

      {/* Sort by Name */}
      <button
        value="name"
        onClick={handleSortChange}
        className={`${baseButtonStyle} ${
          sortOption === 'name' ? activeStyle : inactiveStyle
        }`}
      >
        Sort by Name
      </button>

      {/* Sort Alphabetically */}
      <button
        value="alphabetical"
        onClick={handleSortChange}
        className={`${baseButtonStyle} ${
          sortOption === 'alphabetical' ? activeStyle : inactiveStyle
        }`}
      >
        Alphabetical
      </button>
    </div>
  );
};

export default Sorting;