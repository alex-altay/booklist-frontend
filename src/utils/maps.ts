import { type Language, type Rating, ratings, categories, languages, statuses } from '@/schemas/book'
import { capitalizeProperty } from './capitalize'

const languageMap: Record<Language, string> = {
  RU: 'Russian',
  EN: 'English',
  DE: 'German',
}

const ratingMap: Record<Rating, { score: number; label: string }> = {
  WORST: { score: 1, label: 'Worst' },
  VERY_BAD: { score: 2, label: 'Very Bad' },
  BAD: { score: 3, label: 'Bad' },
  BELOW_AVERAGE: { score: 4, label: 'Below Average' },
  AVERAGE: { score: 5, label: 'Average' },
  ABOVE_AVERAGE: { score: 6, label: 'Above Average' },
  WORTH_READING: { score: 7, label: 'Worth Reading' },
  GOOD: { score: 8, label: 'Good' },
  EXCELLENT: { score: 9, label: 'Excellent' },
  BEST: { score: 10, label: 'Best' },
}
const ratingDetails = ratings.map((r) => ({ rating: r, ...ratingMap[r] }))

function getSelectOptions() {
  return {
    categoryOptions: categories.map((c) => ({ option: c, label: capitalizeProperty(c) })),
    languageOptions: languages.map((l) => ({ label: languageMap[l], option: l })),
    ratingOptions: ratingDetails.map((r) => ({ option: r.rating, label: `${r.score} - ${r.label}` })),
    statusOptions: statuses.map((s) => ({ option: s, label: capitalizeProperty(s) })),
  }
}

export { languageMap, ratingMap, ratingDetails, getSelectOptions }
