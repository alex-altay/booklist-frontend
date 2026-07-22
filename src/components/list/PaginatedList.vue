<template>
  <div v-if="paginatedBooks.length" class="lg:col-span-3 flex flex-col gap-8">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <BookCard
        v-for="book in paginatedBooks"
        :key="book.id"
        :book="book"
        @click="$router.push({ name: 'book', params: { id: book.id } })"
      />
    </div>
    <div class="flex flex-col gap-6">
      <Pagination
        v-if="books.length > PAGINATION_SIZE"
        v-model:page="page"
        :items-per-page="PAGINATION_SIZE"
        :total="books.length"
        :default-page="1"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious class="cursor-pointer" />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
              class="cursor-pointer"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :key="`ellipsis-${index}`" />
          </template>
          <PaginationNext class="cursor-pointer" />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
  <EmptyList v-else :is-new-user class="lg:col-span-3 flex flex-col" @reset-filter="$emit('resetFilter')" />
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import BookCard from '@/components/list/BookCard.vue'
import EmptyList from '@/components/list/EmptyList.vue'
import { PAGINATION_SIZE } from '@/data/constants'
import { computed, ref, watch } from 'vue'
import type { Book } from '@/schemas/book/book'

defineEmits(['resetFilter'])
const props = defineProps<{ books: Book[]; isNewUser: boolean }>()
const page = ref<number>(1)

const paginatedBooks = computed(() => {
  const start = (page.value - 1) * PAGINATION_SIZE
  const end = start + PAGINATION_SIZE
  return [...props.books].slice(start, end)
})

watch(
  () => props.books,
  () => {
    page.value = 1
  },
)

watch(page, () => {
  window.scrollTo({ top: 0 })
})
</script>
