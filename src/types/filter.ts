import type { Book } from '@/schemas/book'

export type Filter = {
    search: string,
    rating: Book['rating']
    language: Book['language']
    endYear: number | null
    category: Book['category']
    status: Book['status']
  }
