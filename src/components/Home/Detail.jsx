import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaBolt, 
  FaBalanceScale, 
  FaExchangeAlt, 
  FaPuzzlePiece, 
  FaFire 
} from 'react-icons/fa';

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoChain = [];
        let evo = evoData.chain;
        do {
          evoChain.push({
            name: evo.species.name,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.split('/')[6]}.png`
          });
          evo = evo.evolves_to[0];
        } while (evo && evo.hasOwnProperty('evolves_to'));
        setEvolution(evoChain);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Loading Pokémon...
      </div>
    </div>
  );

  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 sm:p-6 md:p-8">
      <Link 
        to="/" 
        className="inline-flex items-center mb-4 sm:mb-6 text-blue-300 hover:text-blue-100 transition-colors text-sm sm:text-base"
      >
        <FaArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
        Back to Pokédex
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Pokémon Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-700/50 p-4 sm:p-6 shadow-lg sm:shadow-xl md:shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize mb-1">{pokemon.name}</h2>
              <p className="text-blue-400 font-mono text-sm sm:text-base md:text-lg">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span 
                  key={type.slot}
                  className={`${typeColors[type.type.name]} px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mt-4 sm:mt-6">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-1/2 mt-4 sm:mt-6 md:mt-0">
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-gray-700/50 rounded-lg sm:rounded-xl p-2 sm:p-4">
                  <div className="flex items-center text-yellow-400 mb-1 sm:mb-2">
                    <FaBalanceScale className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="font-semibold text-sm sm:text-base">Height</span>
                  </div>
                  <p className="text-lg sm:text-xl">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg sm:rounded-xl p-2 sm:p-4">
                  <div className="flex items-center text-blue-400 mb-1 sm:mb-2">
                    <FaBolt className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                    <span className="font-semibold text-sm sm:text-base">Weight</span>
                  </div>
                  <p className="text-lg sm:text-xl">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-700/50 p-4 sm:p-6 shadow-lg sm:shadow-xl md:shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
            <FaBolt className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-yellow-400" />
            Stats
          </h3>
          <div className="space-y-2 sm:space-y-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize font-medium text-sm sm:text-base">{stat.stat.name.replace('-', ' ')}</span>
                  <span className="font-mono text-sm sm:text-base">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-700/50 p-4 sm:p-6 shadow-lg sm:shadow-xl md:shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
            <FaPuzzlePiece className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400" />
            Abilities
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
            {pokemon.abilities.map((ability) => (
              <div 
                key={ability.ability.name}
                className="bg-gray-700/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 hover:bg-gray-700/70 transition-colors"
              >
                <div className="flex items-center">
                  <span className="capitalize font-medium text-sm sm:text-base">{ability.ability.name.replace('-', ' ')}</span>
                  {ability.is_hidden && (
                    <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Hidden</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

     {/* Evolution Chain */}
{evolution.length > 1 && (
  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-700/50 p-4 sm:p-6 shadow-lg sm:shadow-xl md:shadow-2xl lg:col-span-2">
    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
      <FaExchangeAlt className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-purple-400" />
      Evolution Chain
    </h3>
    
    {/* Mobile - Vertical Layout */}
    <div className="flex flex-col items-center space-y-4 md:hidden">
      {evolution.map((evo, index) => (
        <React.Fragment key={index}>
          <Link 
            to={`/${evo.url.split('/').slice(-2, -1)[0]}`} 
            className="group flex flex-col items-center w-full"
          >
            <div className="bg-gray-700/50 rounded-full p-3 group-hover:bg-gray-700/70 transition-colors">
              <img 
                src={evo.url} 
                alt={evo.name} 
                className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="mt-2 text-lg font-medium capitalize group-hover:text-blue-300 transition-colors">
              {evo.name}
            </span>
          </Link>
          {index < evolution.length - 1 && (
            <div className="flex items-center justify-center w-full">
              <FaFire className="h-5 w-5 rotate-90 text-yellow-400" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Desktop - Horizontal Layout */}
    <div className="hidden md:flex justify-center items-center space-x-4 lg:space-x-8">
      {evolution.map((evo, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className="flex items-center">
              <div className="h-px w-8 bg-gray-600"></div>
              <FaFire className="h-5 w-5 mx-2 text-yellow-400" />
              <div className="h-px w-8 bg-gray-600"></div>
            </div>
          )}
          <Link 
            to={`/${evo.url.split('/').slice(-2, -1)[0]}`} 
            className="group flex flex-col items-center"
          >
            <div className="bg-gray-700/50 rounded-full p-4 group-hover:bg-gray-700/70 transition-colors">
              <img 
                src={evo.url} 
                alt={evo.name} 
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="mt-2 text-lg font-medium capitalize group-hover:text-blue-300 transition-colors">
              {evo.name}
            </span>
          </Link>
        </React.Fragment>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Detail;