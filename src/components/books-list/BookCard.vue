<template>
  <Card
    class="relative overflow-hidden h-32 w-full min-w-56 py-0 flex flex-col transition-all hover:shadow-md cursor-pointer select-none"
  >
    <div class="h-full p-5 flex flex-row items-start justify-between gap-4">
      <div class="min-w-0 flex-1 space-y-1 text-left">
        <h3 class="font-semibold text-lg leading-tight truncate">
          {{ book.title }}
        </h3>
        <p class="text-sm text-muted-foreground truncate">
          {{ book.author }}
        </p>
      </div>

      <div v-if="book.rating" class="h-full min-w-25 flex flex-col shrink-0 justify-between items-end text-right">
        <div class="text-xl font-bold text-primary leading-none">
          {{ (ratings.indexOf(book.rating) || 0) + 1
          }}<span class="ml-0.5 text-xs text-muted-foreground font-normal">/10</span>
        </div>
        <p class="text-xs font-medium text-muted-foreground italic leading-snug">
          {{ capitalizeProperty(book.rating) }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import { ratings } from '@/schemas/book'
import { capitalizeProperty } from '@/utils/capitalize'
import type { Book } from '@/schemas/book'

defineProps<{ book: Book }>()
</script>
