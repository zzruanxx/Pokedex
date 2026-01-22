'use client';

import { Pokemon } from '@/types/pokemon';
import { typeColors } from '@/constants/pokemon';
import Image from 'next/image';
import { useEffect } from 'react';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pokemon) return null;

  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes de ${pokemon.name}`}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{pokemon.name}</h2>
              <p className="text-gray-500 font-bold text-base sm:text-lg">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="text-gray-400 hover:text-gray-700 text-2xl sm:text-4xl leading-none transition-colors hover:scale-110 transform"
            >
              ×
            </button>
          </div>

          {/* Image and Types */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative w-full lg:w-64 h-48 sm:h-56 lg:h-64 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Tipos</h3>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold capitalize shadow-lg text-sm`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl">
                  <h3 className="text-xs sm:text-sm font-bold mb-1 text-gray-600 uppercase tracking-wide">Altura</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-3 sm:p-4 rounded-xl">
                  <h3 className="text-xs sm:text-sm font-bold mb-1 text-gray-600 uppercase tracking-wide">Peso</h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.slot}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 sm:px-4 py-2 rounded-xl text-sm capitalize font-semibold text-gray-700 shadow-sm"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && ' ⭐'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-gray-800">Estatísticas Base</h3>
            <div className="space-y-3 sm:space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1 sm:mb-2">
                    <span className="capitalize text-sm sm:text-base font-bold text-gray-700">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-gray-800">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
