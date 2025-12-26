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
): Promise<Pokemon[]> {
  const listResponse = await getPokemonList(limit, offset);
  
  // Fetch details for each Pokemon in parallel
  const pokemonPromises = listResponse.results.map(async (item) => {
    const id = item.url.split('/').filter(Boolean).pop();
    return getPokemonDetails(id!);
  });
  
  return Promise.all(pokemonPromises);
}
