import React, { useState, useEffect } from 'react';
import Card from '../Card';
import Search from '../Search';
import Pagination from '../Pagination';
import Sorting from '../Sorting';
import TypeFilter from '../TypeFilter';
import RandomButton from '../RandomButton';
import { HeartIcon, SparklesIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Home = () => {
  const [originalPokemons, setOriginalPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokémon list.');

        const data = await response.json();
        if (!data.results || !Array.isArray(data.results)) throw new Error('Unexpected API response format.');

        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            if (!res.ok) throw new Error(`Failed to fetch data for ${pokemon.name}`);
            return await res.json();
          })
        );

        setOriginalPokemons(details);
        setDisplayedPokemons(details);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...originalPokemons];

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((type) => type.type.name === selectedType)
      );
    }

    if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }

    setDisplayedPokemons(filtered);
    setCurrentPage(1);
  }, [originalPokemons, searchTerm, selectedType, sortOption]);

  const totalPages = Math.ceil(displayedPokemons.length / itemsPerPage);
  const currentPokemons = displayedPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSortOption('id');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-blue-400">
              POKÉDEX 
            </h1>
          </div>
          <Link to="/favorites" className="flex items-center space-x-2 group">
            <div className="relative">
              <HeartIcon className="h-8 w-8 text-red-400 group-hover:text-red-500 transition-all duration-300" />
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-0 group-hover:opacity-20 transition-all duration-300" />
            </div>
            <span className="text-lg font-medium hidden md:inline-block">Favorites</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8 shadow-2xl relative z-20">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClearFilters={handleClearFilters}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <TypeFilter
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
              <Sorting
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>
            <div className="flex justify-end">
              <RandomButton
                originalPokemons={originalPokemons}
                setDisplayedPokemons={setDisplayedPokemons}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
          {currentPokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              totalItems={displayedPokemons.length} // Pass the correct total items count
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        )}
      </main>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 filter blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 filter blur-3xl animate-float animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Home;