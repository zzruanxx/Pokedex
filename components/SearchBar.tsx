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
    <div className="w-full max-w-2xl mx-auto mb-4 relative">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {/* search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>

        <input
          aria-label="Buscar Pokémon"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-28 px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none shadow-sm transition-all bg-white"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {value && (
            <button
              aria-label="Limpar busca"
              onClick={() => onChange('')}
              className="h-10 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-sm transition"
            >
              Limpar
            </button>
          )}
          <button
            aria-label="Buscar"
            onClick={() => onSubmit?.()}
            className="h-10 px-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
