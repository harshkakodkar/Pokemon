import React, { useEffect, useState } from 'react';

const Compare = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [error, setError] = useState('');

  const fetchPokemon = async (name, setFunc) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setFunc(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const handleCompare = () => {
    setError('');
    setPokemon1(null);
    setPokemon2(null);
    fetchPokemon(name1, setPokemon1);
    fetchPokemon(name2, setPokemon2);
  };

  const renderStats = (pokemon) => (
    <ul className="text-left">
      {pokemon.stats.map((stat) => (
        <li key={stat.stat.name}>
          <strong>{stat.stat.name}:</strong> {stat.base_stat}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Compare Pokémon</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter first Pokémon name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Enter second Pokémon name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />
        <button
          onClick={handleCompare}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Compare
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {pokemon1 && pokemon2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[pokemon1, pokemon2].map((pokemon, index) => (
            <div
              key={pokemon.id}
              className="bg-white shadow-md rounded-lg p-4 text-center"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto w-24 h-24"
              />
              <h3 className="text-xl font-bold capitalize mb-2">{pokemon.name}</h3>
              {renderStats(pokemon)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;
