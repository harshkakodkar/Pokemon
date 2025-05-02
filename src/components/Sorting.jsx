import React from 'react';

const Sorting = ({ sortOption, setSortOption }) => {
  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const baseButtonStyle =
    'px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 backdrop-blur-md shadow-lg';
  const inactiveStyle =
    'bg-white/10 text-blue-200 border border-blue-500 hover:bg-blue-500 hover:text-white';
    const activeStyle =
    'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-800/50 ring-2 ring-blue-500 backdrop-blur-md';
  

  return (
    <div className="flex justify-center gap-6 mb-10">
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
