'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPokemonListWithDetails } from '@/services/api';
import { Pokemon } from '@/types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton';
import SearchBar from '@/components/SearchBar';
import PokemonModal from '@/components/PokemonModal'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 20;

  // Fetch Pokemon list with details
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () => getPokemonListWithDetails(itemsPerPage, page * itemsPerPage),
  });

  const pokemonList = data?.pokemon;
  const hasMore = data?.hasMore ?? false;

  // Filter Pokemon based on search term
  const filteredPokemon = pokemonList?.filter((pokemon) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.id.toString().includes(searchLower)
    );
  });

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPokemon(null), 300);
  };

  const handleSearchSubmit = () => {
    setPage(0);
    // nothing else required — filter uses searchTerm state
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-2 text-red-600">
          Pokédex
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Explore o mundo dos Pokémon
        </p>

        {/* Search Bar */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

        {/* Result count */}
        {!isLoading && filteredPokemon && (
          <div className="text-center text-sm text-gray-600 mb-6">
            Resultados: {filteredPokemon.length}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 mb-8">
            Erro ao carregar Pokémon. Por favor, tente novamente.
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <PokemonCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Pokemon Grid */}
        {!isLoading && filteredPokemon && (
          <>
            {filteredPokemon.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                Nenhum Pokémon encontrado
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {filteredPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => handlePokemonClick(pokemon)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {searchTerm === '' && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                >
                  Anterior
                </button>
                <span className="px-6 py-3 bg-white rounded-lg font-semibold border border-gray-300">
                  Página {page + 1}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}

        {/* Pokemon Detail Modal */}
        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
