import type { Book, NewBook } from '@/schemas/book'

export function isNewBook(book: Book | NewBook): book is NewBook {
  return (book as Book).id === undefined && (book as Book).userId === undefined
}

export function isBook(book: Book | NewBook): book is Book {
  return (book as Book).id !== undefined && (book as Book).userId !== undefined
}
