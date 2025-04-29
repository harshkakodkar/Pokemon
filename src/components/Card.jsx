import React from "react";

const Card = ({ pokemon }) => {



  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />
      <p className="text-gray-500">ID: {pokemon.id}</p>
      <h3 className="text-lg font-bold capitalize">Name: {pokemon.name}</h3>

      <div className="flex justify-center flex-wrap gap-1 mt-2">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.slot}
            className="bg-gray-200 rounded-full px-2 py-1 text-sm capitalize"
          >
            Type: {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
