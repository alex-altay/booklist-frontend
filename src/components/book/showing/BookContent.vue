<template>
  <div class="space-y-8 2xl:space-y-12">
    <div>
      <h1 class="text-3xl font-bold leading-tight">{{ book.title }}</h1>
      <p class="text-lg text-muted-foreground mt-1">{{ book.author }}</p>
    </div>

    <Separator />

    <div class="grid grid-cols-2 gap-y-6 gap-x-8">
      <div v-if="book.rating" class="col-span-2">
        <p class="text-xs text-muted-foreground text-left uppercase tracking-wider mb-1">Rating</p>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold text-primary">{{ ratingMap[book.rating].score }}</span>
          <span class="text-sm text-muted-foreground">/</span>
          <span class="text-muted-foreground text-sm">10</span>
          <span class="text-sm text-muted-foreground">—</span>
          <span class="text-sm text-muted-foreground italic">{{ ratingMap[book.rating].label }}</span>
        </div>
      </div>

      <div v-if="book.language" class="text-left">
        <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Language</p>
        <p class="text-sm font-medium">{{ languageMap[book.language] }}</p>
      </div>

      <div v-if="book.category" class="text-left">
        <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p>
        <p class="text-sm font-medium">{{ capitalizeProperty(book.category) }}</p>
      </div>

      <div v-if="book.startDate" class="text-left">
        <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Started</p>
        <p class="text-sm font-medium">{{ formatDate(book.startDate) }}</p>
      </div>

      <div v-if="book.endDate" class="text-left">
        <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ended</p>
        <p class="text-sm font-medium">{{ formatDate(book.endDate) }}</p>
      </div>

      <div class="text-left">
        <p class="text-xs text-muted-foreground text-left uppercase tracking-wider mb-1">Status</p>
        <p
          class="text-sm font-medium"
          :class="{ 'text-foreground': book.hasFinished, 'text-muted-foreground': !book.hasFinished }"
        >
          {{ typeof book.hasFinished === 'boolean' ? (book.hasFinished ? 'Finished' : 'Not Finished') : 'In Process' }}
        </p>
      </div>
    </div>

    <Separator v-if="book.description" />
    <div v-if="book.description" class="text-left">
      <p class="text-xs text-muted-foreground uppercase tracking-wider mb-3">Description</p>
      <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ book.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import { languageMap, ratingMap, formatDate, capitalizeProperty } from '@/utils'
import type { Book, NewBook } from '@/schemas/book'

defineProps<{ book: Book | NewBook }>()
defineEmits(['back', 'edit', 'delete'])
</script>
