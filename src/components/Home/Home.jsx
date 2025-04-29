import { useEffect, useState } from "react";
import Card from "../Card";
import Search from "../Search";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");


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

  // Handle search and filter 
  useEffect(() => {
    let filtered = pokemons;


    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }


    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);





  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Pokemon</h1>

      {/* Search component  */}
      <div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedType={setSelectedType} />
      </div>

      {/* Loading*/}
      {loading && <p className="text-center text-lg mt-10">Loading Pokemon...</p>}
      {error && <p className="text-center text-red-500 text-lg mt-10">Something went wrong fetching pokemon </p>}

      {/* not match */}
      {filteredPokemons.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 text-lg mt-10">No Pokemon match your search!</p>
      )}

      {/* Card component*/}
      {filteredPokemons.length > 0 && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemons.map(pokemon => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
