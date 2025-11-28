import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all 151 Pokemon at once on mount
  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all 151 Pokemon in parallel
        const promises = Array.from({ length: 151 }, async (_, i) => {
          const id = i + 1;

          // Fetch both Pokemon and species data in parallel
          const [pokemonRes, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          ]);

          if (!pokemonRes.ok || !speciesRes.ok) {
            throw new Error(`Failed to fetch Pokemon ${id}`);
          }

          const [pokemonData, speciesData] = await Promise.all([
            pokemonRes.json(),
            speciesRes.json()
          ]);

          // Find Japanese katakana name (ja-Hrkt)
          const japaneseName = speciesData.names.find(
            (n: { name: string; language: { name: string } }) => n.language.name === 'ja-Hrkt'
          )?.name;

          // Skip Pokemon without Japanese names
          if (!japaneseName) {
            return null;
          }

          return {
            id: pokemonData.id,
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
            katakanaName: japaneseName,
          };
        });

        // Wait for all fetches to complete
        const results = await Promise.all(promises);

        // Filter out null values (Pokemon without Japanese names)
        const validPokemon = results.filter((p): p is Pokemon => p !== null);

        setAllPokemon(validPokemon);

        // Set first random Pokemon
        if (validPokemon.length > 0) {
          const randomIndex = Math.floor(Math.random() * validPokemon.length);
          setCurrentPokemon(validPokemon[randomIndex]);
        }
      } catch (err) {
        setError('Failed to load Pokemon data. Please refresh the page.');
        console.error('Pokemon fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  // Get a random Pokemon from cached data (instant)
  const fetchRandomPokemon = () => {
    if (allPokemon.length === 0) return;

    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    setCurrentPokemon(allPokemon[randomIndex]);
  };

  return {
    currentPokemon,
    katakanaName: currentPokemon?.katakanaName || '',
    loading,
    error,
    fetchRandomPokemon
  };
}
