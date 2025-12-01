export interface Pokemon {
  id: number;
  name: string;        // English name
  sprite: string;      // Image URL
  katakanaName: string; // Japanese katakana name
  isShiny: boolean;    // Whether this is a shiny variant
}

export interface PokemonSpecies {
  names: Array<{
    name: string;
    language: { name: string };
  }>;
}
