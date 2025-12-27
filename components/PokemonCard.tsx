import { Pokemon } from '@/types/pokemon';
import { typeColors } from '@/constants/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
  
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
