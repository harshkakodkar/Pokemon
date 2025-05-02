import React from 'react';

const Search = ({ searchTerm, setSearchTerm, onClearFilters }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full md:w-2/3"
      />

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Search;