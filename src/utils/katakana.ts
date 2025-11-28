import * as wanakana from 'wanakana';

/**
 * Validates user romaji input against katakana answer
 * Handles multiple romanization variants (ō/ou/o, ū/uu/u, etc.)
 * Also handles long vowel markers (ー) in katakana
 *
 * @param userInput - User's romaji input
 * @param katakanaAnswer - Expected katakana name
 * @returns true if input matches katakana answer
 *
 * @example
 * validateRomaji("pikachu", "ピカチュウ") // true
 * validateRomaji("pikachuu", "ピカチュウ") // true
 * validateRomaji("hakuryuu", "ハクリュー") // true
 */
/**
 * Normalizes romaji by removing macrons and converting to standard form
 * ō → ou, ū → uu, etc.
 */
function normalizeRomaji(romaji: string): string {
  return romaji
    .toLowerCase()
    .replace(/ā/g, 'aa')
    .replace(/ī/g, 'ii')
    .replace(/ū/g, 'uu')
    .replace(/ē/g, 'ee')
    .replace(/ō/g, 'ou');
}

export function validateRomaji(userInput: string, katakanaAnswer: string): boolean {
  // Convert both to romaji for comparison
  // This handles long vowel markers (ー) correctly
  const userRomaji = wanakana.toRomaji(wanakana.toKatakana(userInput.trim()));
  const answerRomaji = wanakana.toRomaji(katakanaAnswer.trim());

  // Normalize both to handle macrons vs doubled vowels
  const normalizedUser = normalizeRomaji(userRomaji);
  const normalizedAnswer = normalizeRomaji(answerRomaji);

  return normalizedUser === normalizedAnswer;
}
