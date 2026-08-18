import { defineStore } from 'pinia'
import { bookApi } from '@api/book'
import { ref } from 'vue'
import type { Book, NewBook } from '@/schemas/book'

export const useBookStore = defineStore('book', () => {
  const _books = ref<Book[]>([])

  function updateList(books: Book[]) {
    _books.value = [...books].sort((a, b) => a.id - b.id)
  }

  async function getBook(id: number): Promise<Book> {
    return _books.value.find((b) => b.id == id) || (await bookApi.getBook(id))
  }

  async function getBooks(): Promise<Book[]> {
    if (!_books.value.length) {
      updateList(await bookApi.getBooks())
    }
    return _books.value
  }

  async function createBook(book: NewBook) {
    const { allBooks, newBook } = await bookApi.createBook(book)
    updateList(allBooks)
    return newBook
  }

  async function updateBook(book: Book) {
    const { allBooks, updatedBook } = await bookApi.updateBook(book)
    updateList(allBooks)
    return updatedBook
  }

  async function deleteBook(id: Book['id']) {
    const books = await bookApi.deleteBook(id)
    updateList(books)
  }

  return { getBook, getBooks, createBook, deleteBook, updateBook }
})
