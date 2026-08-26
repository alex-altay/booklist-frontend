import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filter } from '@/types/filter'
import type { Book } from '@/schemas/book'

const defaultFilter: Filter = {
  search: '',
  rating: null,
  endYear: null,
  category: null,
  language: null,
  status: null,
}

export const useFilterStore = defineStore('filter', () => {
  const filter = ref<Filter>({ ...defaultFilter })

  function reset() {
    filter.value = { ...defaultFilter }
  }

  function apply(books: Book[]): Book[] {
    let filtered = [...books]
    for (const [k, v] of Object.entries(filter.value)) {
      if (v === null) {
        continue
      } else if (k === 'search') {
        if (v && typeof v === 'string' && v.length > 0) {
          filtered = filtered.filter((book) => book.author.includes(v) || book.title.includes(v))
        }
      } else if (k === 'endYear') {
        filtered = filtered.filter((book) => (book.endDate ? new Date(book.endDate).getFullYear() === v : false))
      } else {
        // Rating, Category, Status, Language
        filtered = filtered.filter((el: Book) => el[k as keyof Book] === v)
      }
    }
    return filtered
  }

  return { apply, reset, filter }
})
