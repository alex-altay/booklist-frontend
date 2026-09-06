<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <AccordionWrapper>
      <template #header>
        <FilterHeader />
      </template>
      <template #body>
        <FilterBody :years />
      </template>
    </AccordionWrapper>
    <PaginatedList :books="filteredBooks" :is-new-user />
  </div>
</template>

<script setup lang="ts">
import AccordionWrapper from '@/components/list/filter/AccordionWrapper.vue'
import FilterHeader from '@/components/list/filter/FilterHeader.vue'
import FilterBody from '@/components/list/filter/FilterBody.vue'
import PaginatedList from '@/components/list/PaginatedList.vue'
import { useBookStore } from '@/stores/book'
import { useFiltrationStore } from '@/stores/filtration'
import { useApi } from '@/composables/useApi'
import { getYears } from '@/utils'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { type Book } from '@/schemas/book'
import { computed } from 'vue'

const bookStore = useBookStore()
const { applyFilter } = useFiltrationStore()
const { request } = useApi()

const result = await request(() => bookStore.fetchBooks())
if (!result.ok && result.message) {
  toast.error(result.message)
}

const { books } = storeToRefs(bookStore)
const years = computed(() => getYears(books.value))
const isNewUser = computed(() => books.value.length === 0)
const filteredBooks = computed<Book[]>(() => applyFilter(books.value))
</script>
