import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';

export function usePokemon() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all 151 Pokemon at once on mount using GraphQL
  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = `
          query GetAllPokemon {
            pokemon(limit: 151) {
              id
              name
              pokemonspecy {
                pokemonspeciesnames(where: {language: {name: {_eq: "ja-Hrkt"}}}) {
                  name
                }
              }
              pokemonsprites {
                default_sprite: sprites(path: "$.front_default")
                shiny_sprite: sprites(path: "$.front_shiny")
              }
            }
          }
        `;

        const response = await fetch('https://graphql.pokeapi.co/v1beta2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon data from GraphQL endpoint');
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error('GraphQL query errors: ' + JSON.stringify(result.errors));
        }

        // Map GraphQL response to Pokemon type
        const validPokemon: Pokemon[] = result.data.pokemon
          .map((p: any) => {
            // Get Japanese katakana name
            const japaneseName = p.pokemonspecy?.pokemonspeciesnames?.[0]?.name;

            // Skip Pokemon without Japanese names
            if (!japaneseName) {
              return null;
            }

            // Get sprites (first item in array)
            const sprites = p.pokemonsprites?.[0];
            const defaultSprite = sprites?.default_sprite;
            const shinySprite = sprites?.shiny_sprite;

            // Skip if no sprites available
            if (!defaultSprite) {
              return null;
            }

            // 1/100 chance for shiny sprite
            const isShiny = Math.random() < 0.01;
            const sprite = isShiny && shinySprite ? shinySprite : defaultSprite;

            return {
              id: p.id,
              name: p.name,
              sprite,
              katakanaName: japaneseName,
            };
          })
          .filter((p: Pokemon | null): p is Pokemon => p !== null);

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
