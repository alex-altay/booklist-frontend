import { defineStore } from 'pinia'
import { bookApi } from '@api/book'
import type { Book } from '@/schemas/book'

export const bookStore = defineStore('book', () => {
  async function getBooks(): Promise<Book[]> {
    return await bookApi.getBooks()
  }

  async function createBook(newBook: Book) {
    return await bookApi.createBook(newBook)
  }

  return { getBooks, createBook }
})
