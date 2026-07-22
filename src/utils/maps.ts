import { type Language, type Rating } from '@/schemas/book'

const languageMap: Record<Language, string> = {
  RU: 'Russian',
  EN: 'English',
  DE: 'German',
}

const ratingMap: Record<Rating, [number, string]> = {
  WORST: [1, 'Worst'],
  VERY_BAD: [2, 'Very Bad'],
  BAD: [3, 'Bad'],
  BELOW_AVERAGE: [4, 'Below Average'],
  AVERAGE: [5, 'Average'],
  ABOVE_AVERAGE: [6, 'Above Average'],
  WORTH_READING: [7, 'Worth Reading'],
  GOOD: [8, 'Good'],
  EXCELLENT: [9, 'Excellent'],
  BEST: [10, 'Best'],
}

export { languageMap, ratingMap }
