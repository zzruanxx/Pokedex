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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h2>
              <p className="text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Image and Types */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-full md:w-64 h-64 mx-auto">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Tipos</h3>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      className={`${typeColors[type.type.name] || 'bg-gray-400'} text-white px-4 py-2 rounded-full font-semibold capitalize`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Altura</h3>
                  <p className="text-gray-700">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Peso</h3>
                  <p className="text-gray-700">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.slot}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && ' (Oculta)'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Estatísticas Base</h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize text-sm font-medium">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-bold">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
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
