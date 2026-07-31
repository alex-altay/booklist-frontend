<template>
  <Card class="p-6">
    <div class="flex items-center justify-start">
      <div class="p-2.5 mr-4 bg-muted rounded-lg">
        <Infinity class="w-5 h-5 text-muted-foreground" />
      </div>
      <p class="inline-block text-left text-xs text-muted-foreground uppercase tracking-wider">The Longest Books</p>
    </div>
    <div v-if="longestBooks.length" class="space-y-3">
      <div v-for="(book, index) in longestBooks" :key="index" class="flex items-center gap-4">
        <span class="w-4 shrink-0text-xs text-muted-foreground text-right">{{ index + 1 }}</span>
        <div class="flex-1 min-w-0 cursor-pointer" @click="$router.push({ name: 'book', params: { id: book.id } })">
          <div class="mb-1 flex items-baseline justify-between gap-2">
            <span class="text-sm font-medium truncate">{{ book.title }}, {{ book.author }}</span>
            <span class="shrink-0 text-sm font-semibold">{{ book.duration }} days</span>
          </div>
          <div class="h-1.5 bg-muted rounded-xs overflow-hidden">
            <div
              class="h-full bg-primary rounded-xs"
              :style="{ width: `${Math.round((book.duration / maxDays) * 100)}%` }"
            />
          </div>
        </div>
      </div>
      <p class="mt-8 text-xs text-left text-muted-foreground">time between starting and finishing a book</p>
    </div>
    <p v-else class="text-sm text-left text-muted-foreground">There are no books with filled both start and end time</p>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Infinity } from '@lucide/vue'
import { getDaysDuration } from '@/utils/date'
import { LONGEST_BOOKS_LIST_LENGTH } from '@/data/constants'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()

type Longest = {
  id: Book['id']
  author: Book['author']
  title: Book['title']
  duration: number
}
const longestBooks: Longest[] = books
  .filter((b) => b.startDate && b.endDate)
  .map((b: Book): Longest => ({ id: b.id, title: b.title, author: b.author, duration: getDaysDuration(b) }))
  .sort((a, b) => b.duration - a.duration)
  .slice(0, LONGEST_BOOKS_LIST_LENGTH)
const maxDays = longestBooks.length ? longestBooks[0].duration : 0
</script>
