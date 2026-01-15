import React from 'react';
import { Pokemon } from '@/types/pokemon';
import { typeColors } from '@/constants/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };
  
  return (
    <div 
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 animate-slideUp"
    >
      <div className="relative w-full h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        <Image
          src={imageUrl}
          alt={pokemon.name}
          fill
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      </div>
      
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 mb-1 tracking-wider">#{pokemon.id.toString().padStart(3, '0')}</p>
        <h3 className="text-xl font-bold capitalize mb-3 text-gray-800 group-hover:text-red-600 transition-colors">
          {pokemon.name}
        </h3>
        
        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm hover:shadow-md transition-shadow`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
