import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="relative w-full h-48 mb-3">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">#{pokemon.id.toString().padStart(3, '0')}</p>
        <h3 className="text-xl font-bold capitalize mb-3">
          {pokemon.name}
        </h3>
        
        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
