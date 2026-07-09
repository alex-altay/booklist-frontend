import { axiosInstance } from '@api/axios-config'
import type { Book, CreateBookResponse, NewBook, UpdatedBookResponse } from '@/schemas/book'

export const bookApi = {
  getBook(id: string) {
    return axiosInstance.get<Book>(`books/${id}`)
  },

  getBooks() {
    return axiosInstance.get<Book[]>('books')
  },

  createBook(book: NewBook) {
    return axiosInstance.post<NewBook, CreateBookResponse>('books/create', book)
  },

  updateBook(book: Book) {
    return axiosInstance.patch<Book, UpdatedBookResponse>(`books/update/${book.id}`, book)
  },

  deleteBook(id: Book['id']) {
    return axiosInstance.delete<Book[]>(`books/delete/${id}`)
  },
}
