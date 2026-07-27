<template>
  <Card class="p-6 flex items-start gap-4">
    <div class="bg-muted rounded-lg p-2.5">
      <Star class="w-5 h-5 text-muted-foreground" />
    </div>
    <div class="text-left">
      <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Average Rating</p>
      <p class="text-3xl font-bold">{{ averageRating ?? '—' }}</p>
      <p class="text-xs text-muted-foreground mt-0.5">out of 10</p>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Star } from '@lucide/vue'
import { ratingMap } from '@/utils'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const [totalRating, totalBooks] = books.reduce(
  (acc: [number, number], el: Book): [number, number] =>
    el.rating ? [acc[0] + ratingMap[el.rating][0], acc[1] + 1] : acc,
  [0, 0],
)
const averageRating = Math.round((totalRating / totalBooks) * 10) / 10
</script>
