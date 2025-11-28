import { useState } from 'react';
import * as wanakana from 'wanakana';
import { usePokemon } from './hooks/usePokemon';
import { validateRomaji } from './utils/katakana';
import { PokemonCard } from './components/PokemonCard';
import { RomajiInput } from './components/RomajiInput';
import { FeedbackMessage } from './components/FeedbackMessage';

function App() {
  const { currentPokemon, katakanaName, loading, fetchRandomPokemon } = usePokemon();
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success' | null;
    message: string;
    correctAnswer?: string;
  }>({ type: null, message: '' });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleSubmit = (userInput: string) => {
    const isCorrect = validateRomaji(userInput, katakanaName);

    if (isCorrect) {
      // Show success animation
      setShowSuccessAnimation(true);

      // Clear feedback and load next Pokemon immediately
      setFeedback({ type: null, message: '' });
      fetchRandomPokemon();

      // Hide animation after 500ms
      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 500);
    } else {
      // Convert katakana to romaji to show the correct answer
      const correctRomaji = wanakana.toRomaji(katakanaName);
      setFeedback({
        type: 'error',
        message: 'Try again!',
        correctAnswer: correctRomaji
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Katakana Reading Practice
          </h1>
          <p className="text-gray-600">
            Type the romaji for the Pokemon name
          </p>
        </div>

        <PokemonCard
          pokemon={currentPokemon}
          loading={loading}
          showSuccessAnimation={showSuccessAnimation}
        />

        <RomajiInput onSubmit={handleSubmit} disabled={loading} />

        <FeedbackMessage
          type={feedback.type}
          message={feedback.message}
          correctAnswer={feedback.correctAnswer}
        />
      </div>
    </div>
  );
}

export default App
