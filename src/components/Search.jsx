import React from 'react';

const Search = ({ searchTerm, setSearchTerm, setSelectedType }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="flex gap-4 flex-col md:flex-row justify-center mb-8">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
      />
      <select
        onChange={handleSelectTypeChange}
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
      >
        <option value="">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="poison">Poison</option>
        <option value="flying">Flying</option>
        <option value="bug">Bug</option>
        <option value="fairy">Fairy</option>
        <option value="dragon">Dragon</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fighting">Fighting</option>


      </select>
    </div>
  );
};

export default Search;
