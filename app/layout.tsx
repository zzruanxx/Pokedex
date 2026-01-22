import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Pokedex - Next.js",
  description: "Uma aplicação web moderna para visualizar informações sobre Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-gray-300">
              © 2026 Pokédex. Dados fornecidos pela{' '}
              <a 
                href="https://pokeapi.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors underline"
              >
                PokéAPI
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Explore o mundo dos Pokémon com dados oficiais
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
