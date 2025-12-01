# Katakana Reading Practice with Pokemon

A simple TypeScript React app for practicing katakana reading using Pokemon from the PokeAPI.

## Features

- Random Pokemon from the original 151
- **Instant Pokemon switching** - All data loaded upfront for zero-delay transitions
- Display Pokemon sprite with katakana name
- Input validation supporting multiple romaji romanization variants
- Instant feedback on correct/incorrect answers with answer reveal
- Automatic progression to next Pokemon on correct answer
- Long vowel marker (ー) support for accurate katakana romanization

## Tech Stack

- **Vite** - Fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **WanaKana** - Katakana-to-romaji validation
- **PokeAPI GraphQL** - Pokemon data source

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Visit http://localhost:5173/ to use the app.

### Build for production
```bash
npm run build
```

## How to Use

1. A random Pokemon appears with its name in katakana
2. Type the romaji romanization in the input field
3. Press Enter or click Submit
4. If correct, you'll see a success message and move to the next Pokemon
5. If incorrect, try again with a different romanization

## Romanization Support

The app accepts multiple romanization variants thanks to WanaKana:
- Long vowels: `ō`, `ou`, `oo`, or `o`
- Examples for Pikachu (ピカチュウ):
  - `pikachu` ✓
  - `pikachuu` ✓
  - `pikatyuu` ✓

## Project Structure

```
src/
├── components/
│   ├── PokemonCard.tsx      # Pokemon display
│   ├── RomajiInput.tsx      # Input field
│   └── FeedbackMessage.tsx  # Success/error messages
├── hooks/
│   └── usePokemon.ts        # Pokemon data fetching
├── utils/
│   └── katakana.ts          # Romaji validation
├── types/
│   └── pokemon.ts           # TypeScript interfaces
├── App.tsx                  # Main component
├── main.tsx                 # Entry point
└── index.css                # Tailwind directives
```

## Design Principles

- **No code duplication** - Single source of truth for state, logic separated into hooks and utils
- **Presentational components** - All UI components are stateless and receive data via props
- **Type safety** - Full TypeScript coverage
- **Clean architecture** - Separation of concerns between data fetching, validation, and presentation
- **Performance optimized** - All 151 Pokemon fetched with single GraphQL query on initial load, then cached for instant transitions

## Performance

The app uses GraphQL to efficiently fetch all Pokemon data on initial load:
- **Initial load**: ~2-3 seconds with single GraphQL query for all 151 Pokemon
- **Pokemon transitions**: Instant (0ms) - selects from cached data
- **Network requests**: 1 GraphQL query (fetches only required fields: id, name, sprites, Japanese names)
- **Memory footprint**: ~150KB for cached Pokemon data
- **Previous REST approach**: 302 requests - migrated to GraphQL for better performance
