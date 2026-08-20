import { defineStore } from 'pinia'
import { bookApi } from '@api/book'
import { ref, computed } from 'vue'
import type { Book, NewBook } from '@/schemas/book'

export const useBookStore = defineStore('book', () => {
  const _books = ref<Book[]>([])
  const _hasLoaded = ref(false)
  const books = computed(() => _books.value)

  function _setList(list: Book[]) {
    _books.value = [...list].sort((a, b) => a.id - b.id)
    _hasLoaded.value = true
  }

  async function getBook(id: number): Promise<Book> {
    return _books.value.find((b) => b.id === id) || (await bookApi.getBook(id))
  }

  async function fetchBooks(): Promise<void> {
    if (_hasLoaded.value) {
      return
    }
    _setList(await bookApi.getBooks())
  }

  async function createBook(book: NewBook) {
    const { allBooks, newBook } = await bookApi.createBook(book)
    _setList(allBooks)
    return newBook
  }

  async function updateBook(book: Book) {
    const { allBooks, updatedBook } = await bookApi.updateBook(book)
    _setList(allBooks)
    return updatedBook
  }

  async function deleteBook(id: Book['id']) {
    _setList(await bookApi.deleteBook(id))
  }

  function reset() {
    _books.value = []
    _hasLoaded.value = false
  }

  return { books, getBook, fetchBooks, createBook, deleteBook, updateBook, reset }
})
