import type { Book } from '@/schemas/book'

declare global {
  type All = 'all'
  
  type Filter = {
    search: string,
    rating: Book['rating'] | All
    language: Book['language'] | All
    endYear: number | All
    category: Book['category'] | All
    hasFinished?: boolean
  }
}

export {}
