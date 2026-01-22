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
  const itemsPerPage = 36; // Increased from 20 to 36 for better display

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
    <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-3 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
            Pokédex
          </h1>
          <p className="text-center text-gray-700 text-base sm:text-lg font-medium px-4">
            Explore o mundo dos Pokémon ✨
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={handleSearchSubmit} />

        {/* Result count */}
        {!isLoading && filteredPokemon && (
          <div className="text-center text-sm text-gray-700 mb-6 font-semibold">
            {filteredPokemon.length} Pokémon{filteredPokemon.length !== 1 ? 's' : ''} encontrado{filteredPokemon.length !== 1 ? 's' : ''}
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
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
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
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
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 text-sm sm:text-base"
                >
                  ← Anterior
                </button>
                <span className="px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-xl font-bold border-2 border-gray-300 shadow-md flex items-center justify-center text-sm sm:text-base">
                  Página {page + 1}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 text-sm sm:text-base"
                >
                  Próxima →
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
