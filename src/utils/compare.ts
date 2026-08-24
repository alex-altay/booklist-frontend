import { type NewBook, newBook } from '@/schemas/book'

export function areBooksEqual(a: NewBook, b: NewBook) {
  const keys = Object.keys(newBook.shape) as (keyof NewBook)[]
  return keys.every((k) => a[k] === b[k])
}
