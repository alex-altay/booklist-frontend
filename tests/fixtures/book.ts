import type { Book } from '@/schemas/book'

const baseBook: Book = {
  id: 1,
  title: 'Solaris',
  author: 'Stanislaw Lem',
  language: 'EN',
  startDate: '2019-08-30',
  endDate: '2019-09-01',
  status: 'FINISHED',
  description: null,
  rating: 'GOOD',
  category: 'FICTION',
  userId: 667,
}

export function makeBook(overrides: Partial<Book> = {}): Book {
  return { ...baseBook, ...overrides }
}
