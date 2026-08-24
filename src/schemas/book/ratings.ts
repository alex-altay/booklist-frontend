import { z } from '../zod'

const ratings = [
  'WORST',
  'VERY_BAD',
  'BAD',
  'BELOW_AVERAGE',
  'AVERAGE',
  'ABOVE_AVERAGE',
  'WORTH_READING',
  'GOOD',
  'EXCELLENT',
  'BEST',
] as const
const rating = z.enum(ratings)
type Rating = z.infer<typeof rating>

export { rating, ratings, type Rating }
