import type { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon | null;
  loading: boolean;
  showSuccessAnimation?: boolean;
}

export function PokemonCard({ pokemon, loading, showSuccessAnimation }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading Pokemon data...</p>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center transform transition-all hover:shadow-xl relative">
      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-2xl flex items-center justify-center animate-pulse">
          <div className="bg-green-500 rounded-full p-4">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <div className="mt-4">
          <p className="text-5xl font-bold text-gray-800 tracking-wide">
            {pokemon.isShiny && (
              <span className="text-yellow-400" title="Shiny!">
                ✨
              </span>
            )}
            {pokemon.katakanaName}
            {pokemon.isShiny && (
              <span className="text-yellow-400" title="Shiny!">
                ✨
              </span>
            )}
          </p>
          <p className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-1">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
