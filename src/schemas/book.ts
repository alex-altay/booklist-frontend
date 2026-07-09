import * as z from 'zod/v4'
import { User } from '@/schemas/user'

const languages = ['RU', 'EN', 'DE'] as const
const language = z.enum(languages)
type Language = z.infer<typeof language>

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

const categories = ['NON_FICTION', 'SCIENCE', 'POETRY', 'TECHNICAL', 'PHILOSOPHY', 'FICTION'] as const
const category = z.enum(categories)
type Category = z.infer<typeof category>

const book = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  language: language.nullish(),
  startDate: z.iso.datetime().nullish(),
  endDate: z.iso.datetime().nullish(),
  hasFinished: z.boolean().nullish(),
  description: z.string().nullish(),
  rating: rating.nullish(),
  category: category.nullish(),
  userId: User.shape.userId.nullish(),
})

type Book = z.infer<typeof book>
type NewBook = Omit<Book, 'id' | 'userId'>

const createBookResponse = z.object({
  allBooks: z.array(book),
  newBook: book,
})
type CreateBookResponse = z.infer<typeof createBookResponse>

const updatedBookResponse = z.object({
  allBooks: z.array(book),
  updatedBook: book,
})
type UpdatedBookResponse = z.infer<typeof updatedBookResponse>

export type { CreateBookResponse, UpdatedBookResponse, Language, Rating, Category, Book, NewBook }

export { book, categories, languages, ratings, createBookResponse, updatedBookResponse }
