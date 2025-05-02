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
      <div className="animate-pulse text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 md:p-8">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-300 hover:text-blue-100 transition-colors">
        <FaArrowLeft className="h-5 w-5 mr-2" />
        Back to Pokédex
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pokémon Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-6 shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-bold capitalize mb-1">{pokemon.name}</h2>
              <p className="text-blue-400 font-mono text-lg">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            <div className="flex space-x-2">
              {pokemon.types.map((type) => (
                <span 
                  key={type.slot}
                  className={`${typeColors[type.type.name]} px-3 py-1 rounded-full text-xs font-bold uppercase`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mt-6">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center text-yellow-400 mb-2">
                    <FaBalanceScale className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Height</span>
                  </div>
                  <p className="text-xl">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center text-blue-400 mb-2">
                    <FaBolt className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Weight</span>
                  </div>
                  <p className="text-xl">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-6 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <FaBolt className="h-6 w-6 mr-2 text-yellow-400" />
            Stats
          </h3>
          <div className="space-y-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize font-medium">{stat.stat.name.replace('-', ' ')}</span>
                  <span className="font-mono">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-6 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <FaPuzzlePiece className="h-6 w-6 mr-2 text-blue-400" />
            Abilities
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {pokemon.abilities.map((ability) => (
              <div 
                key={ability.ability.name}
                className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700/70 transition-colors"
              >
                <span className="capitalize font-medium">{ability.ability.name.replace('-', ' ')}</span>
                {ability.is_hidden && (
                  <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">Hidden</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Evolution Chain */}
        {evolution.length > 1 && (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-700/50 p-6 shadow-2xl lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FaExchangeAlt className="h-6 w-6 mr-2 text-purple-400" />
              Evolution Chain
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {evolution.map((evo, index) => (
                <Link 
                  to={`/${evo.url.split('/').slice(-2, -1)[0]}`} 
                  key={index}
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
                  {index < evolution.length - 1 && (
                    <div className="flex items-center justify-center w-full my-4">
                      <div className="h-px w-16 bg-gray-600"></div>
                      <FaFire className="h-5 w-5 mx-2 text-yellow-400" />
                      <div className="h-px w-16 bg-gray-600"></div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
