import { Pokemon, PokemonListResponse } from '@/types/pokemon';

const POKEAPI_BASE_URL = 'https://api.pokeapi.co/api/v2';

export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  return response.json();
}

export async function getPokemonDetails(
  nameOrId: string | number
): Promise<Pokemon> {
  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
  }
  
  return response.json();
}

export async function getPokemonListWithDetails(
  limit: number = 20,
  offset: number = 0
): Promise<{ pokemon: Pokemon[]; hasMore: boolean }> {
  const listResponse = await getPokemonList(limit, offset);
  
  // Fetch details for each Pokemon in parallel
  const pokemonPromises = listResponse.results.map(async (item) => {
    // Extract ID from URL like "https://pokeapi.co/api/v2/pokemon/1/"
    const urlParts = item.url.split('/').filter(Boolean);
    const id = urlParts[urlParts.length - 1];
    
    if (!id) {
      throw new Error(`Failed to extract Pokemon ID from URL: ${item.url}`);
    }
    
    return getPokemonDetails(id);
  });
  
  const pokemon = await Promise.all(pokemonPromises);
  
  return {
    pokemon,
    hasMore: listResponse.next !== null,
  };
}
