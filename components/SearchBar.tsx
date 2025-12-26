'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Buscar Pokémon por nome ou ID..." }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none shadow-md transition-all"
      />
    </div>
  );
}
