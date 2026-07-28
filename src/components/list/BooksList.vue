<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <ListFilter v-model="filter" :years="years" @reset-filter="resetFilter" />
    <PaginatedList :books="filteredBooks" :is-new-user @reset-filter="resetFilter" />
  </div>
</template>

<script setup lang="ts">
import ListFilter from '@/components/list/ListFilter.vue'
import PaginatedList from '@/components/list/PaginatedList.vue'
import { bookStore } from '@/stores/book'
import { computed, ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { getYears } from '@/utils/date'
import type { Book } from '@/schemas/book/book'

const { request } = useApi()
const { getBooks } = bookStore()
const books = (await request(() => getBooks())) || []
const years = getYears(books)

const ALL = 'all' as const
const defaultFilter: Filter = {
  search: '',
  rating: ALL,
  endYear: ALL,
  category: ALL,
  language: ALL,
  hasFinished: undefined,
}
const filter = ref<Filter>({ ...defaultFilter })
const filteredBooks = computed<Book[]>(() => {
  let filtered = [...books]
  for (const [k, v] of Object.entries(filter.value)) {
    if (v == ALL) {
      continue
    } else if (k == 'search') {
      if (v && typeof v == 'string' && v.length > 0) {
        filtered = filtered.filter((book) => book.author.includes(v) || book.title.includes(v))
      }
    } else if (k == 'endYear') {
      filtered = filtered.filter((book) => (book.endDate ? new Date(book.endDate).getFullYear() == Number(v) : false))
    } else if (v !== undefined) {
      // Rating, Category, hasFinished, Language
      filtered = filtered.filter((el: Book) => el[k as keyof Book] == v)
    }
  }
  return filtered
})
const isNewUser = books.length == filteredBooks.value.length && books.length == 0

function resetFilter() {
  filter.value = { ...defaultFilter }
}
</script>
