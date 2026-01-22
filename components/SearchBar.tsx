'use client';

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar Pokémon por nome ou ID...",
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8 relative">
      <div className="relative">
        <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {/* search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="sm:w-5 sm:h-5">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        <input
          aria-label="Buscar Pokémon"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-20 sm:pr-28 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:outline-none shadow-lg hover:shadow-xl transition-all bg-white font-medium"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
          {value && (
            <button
              aria-label="Limpar busca"
              onClick={() => onChange('')}
              className="h-8 sm:h-10 px-3 sm:px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              Limpar
            </button>
          )}
          <button
            aria-label="Buscar"
            onClick={() => onSubmit?.()}
            className="h-8 sm:h-10 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold transition-all shadow-md hover:shadow-lg text-xs sm:text-sm"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
