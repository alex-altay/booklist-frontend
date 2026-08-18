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
        v-if="books.length > paginationSize"
        v-model:page="page"
        :items-per-page="paginationSize"
        :total="books.length"
        :default-page="1"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationFirst class="cursor-pointer">
            <ChevronsLeft class="h-4 w-auto" />
          </PaginationFirst>
          <PaginationPrevious :class="{ 'px-1!': isSmallerThanLg }" class="cursor-pointer">
            <ChevronLeft v-if="isSmallerThanLg" class="h-4 w-auto" />
            <Button v-else variant="ghost" class="px-0 cursor-pointer"> Previous </Button>
          </PaginationPrevious>
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
          <PaginationNext :class="{ 'px-1!': isSmallerThanLg }" class="cursor-pointer">
            <ChevronRight v-if="isSmallerThanLg" class="h-4 w-auto" />
            <Button v-else variant="ghost" class="px-0 cursor-pointer">Next</Button>
          </PaginationNext>
          <PaginationLast class="cursor-pointer">
            <ChevronsRight class="h-4 w-auto" />
          </PaginationLast>
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
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination'
import BookCard from '@/components/list/BookCard.vue'
import EmptyList from '@/components/list/EmptyList.vue'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/vue'
import { PAGINATION_SIZE_BASE, PAGINATION_SIZE_XL } from '@/data/constants'
import { computed, ref, watch } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import type { Book } from '@/schemas/book'

defineEmits(['resetFilter'])
const props = defineProps<{ books: Book[]; isNewUser: boolean }>()
const page = ref<number>(1)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg')
const paginationSize = computed(() => (breakpoints.smaller('2xl').value ? PAGINATION_SIZE_BASE : PAGINATION_SIZE_XL))

const paginatedBooks = computed(() => {
  const start = (page.value - 1) * paginationSize.value
  const end = start + paginationSize.value
  return props.books.slice(start, end)
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

watch(paginationSize, (newSize, oldSize) => {
  const firstBookIndex = (page.value - 1) * oldSize
  page.value = Math.floor(firstBookIndex / newSize) + 1
})
</script>
