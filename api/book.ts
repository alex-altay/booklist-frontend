import { axiosInstance } from './axios'
import {
  book as bookSchema,
  type Book,
  type NewBook,
  type CreateBookResponse,
  type UpdatedBookResponse,
} from '@/schemas/book'

function parseBook(book: Book): Book {
  return bookSchema.parse(book)
}

function parseList(books: Book[]): Book[] {
  return books
    .map((book) => {
      const { success, data } = bookSchema.safeParse(book)
      return success ? data : null
    })
    .filter((book) => book !== null)
}

export const bookApi = {
  async getBook(id: number): Promise<Book> {
    const book = await axiosInstance.get<Book>(`books/${id}`)
    return parseBook(book)
  },

  async getBooks(): Promise<Book[]> {
    const books = await axiosInstance.get<Book[]>('books')
    return parseList(books)
  },

  async createBook(book: NewBook) {
    const { allBooks, newBook } = await axiosInstance.post<NewBook, CreateBookResponse>('books/create', book)
    return { allBooks: parseList(allBooks), newBook: parseBook(newBook) }
  },

  async updateBook(book: Book) {
    const { allBooks, updatedBook } = await axiosInstance.patch<Book, UpdatedBookResponse>(
      `books/update/${book.id}`,
      book,
    )
    return { allBooks: parseList(allBooks), updatedBook: parseBook(updatedBook) }
  },

  async deleteBook(id: Book['id']) {
    return parseList(await axiosInstance.delete<Book[]>(`books/delete/${id}`))
  },
}
