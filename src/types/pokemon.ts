export interface Pokemon {
  id: number;
  name: string;        // English name
  sprite: string;      // Image URL
  katakanaName: string; // Japanese katakana name
}

export interface PokemonSpecies {
  names: Array<{
    name: string;
    language: { name: string };
  }>;
}
