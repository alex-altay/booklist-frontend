import type { Book, NewBook } from '@/schemas/book'

function isNewBook(book: Book | NewBook): book is NewBook {
  return (book as Book).id === undefined && (book as Book).userId === undefined
}

type GuardResolve = (value: boolean | PromiseLike<boolean>) => void
type GuardReject = (reason?: unknown) => void

export {
  isNewBook,
  type GuardReject,
  type GuardResolve,
}
