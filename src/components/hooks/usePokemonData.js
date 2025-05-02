import { useState, useEffect } from "react";

// Custom hook to fetch Pokémon data
const usePokemonData = (searchTerm, selectedTypes, sortOption, currentPage, itemsPerPage) => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Fetch available Pokémon types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setTypes(data.results.map((type) => type.name));
      } catch (err) {
        console.error("Error fetching types", err);
      }
    };

    fetchTypes();
  }, []);

  // Filter and sort Pokémon based on search term, types, and sort option
  useEffect(() => {
    let filtered = pokemons;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => selectedTypes.includes(t.type.name))
      );
    }

    // Sort Pokémon
    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    } else {
      filtered.sort((a, b) => a.id - b.id); // Default sorting by ID
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedTypes, pokemons, sortOption]);

  // Pagination
  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return {
    pokemons,
    filteredPokemons: currentPokemons,
    loading,
    error,
    types,
    setFilteredPokemons,
  };
};

export default usePokemonData;
