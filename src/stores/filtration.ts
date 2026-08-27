import { PAGINATION_SIZE_BASE, PAGINATION_SIZE_XL } from '@/data/constants'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { type Filter } from '@/types/filter'
import { type Book } from '@/schemas/book'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const DEFAULT_PAGE = 1
const DEFAULT_FILTER: Filter = {
  search: '',
  rating: null,
  endYear: null,
  category: null,
  language: null,
  status: null,
}

export const useFiltrationStore = defineStore('filtration', () => {
  const filter = ref<Filter>({ ...DEFAULT_FILTER })
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const paginationSize = computed(() => (breakpoints.smaller('2xl').value ? PAGINATION_SIZE_BASE : PAGINATION_SIZE_XL))
  const page = ref<number>(DEFAULT_PAGE)

  function reset() {
    filter.value = { ...DEFAULT_FILTER }
    page.value = DEFAULT_PAGE
  }

  function applyFilter(books: Book[]): Book[] {
    let filtered = books
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

  function applyPagination(books: Book[]): Book[] {
    const start = (page.value - 1) * paginationSize.value
    const end = start + paginationSize.value
    return books.slice(start, end)
  }

  function clampPage(length: number) {
    const lastPage = Math.max(1, Math.ceil(length / paginationSize.value))
    page.value = Math.min(page.value, lastPage)
  }

  watch(paginationSize, (newSize, oldSize) => {
    const firstBookIndex = (page.value - 1) * oldSize
    page.value = Math.floor(firstBookIndex / newSize) + 1
  })

  watch(
    filter,
    () => {
      page.value = DEFAULT_PAGE
    },
    { deep: true },
  )

  return {
    filter,
    page,
    paginationSize,
    applyFilter,
    applyPagination,
    clampPage,
    reset,
  }
})
