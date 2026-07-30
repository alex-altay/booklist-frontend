<template>
  <Card class="p-6 flex items-start gap-4">
    <div class="bg-muted rounded-lg p-2.5">
      <BookCheck class="w-5 h-5 text-muted-foreground" />
    </div>
    <div>
      <p class="text-left text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Read</p>
      <div class="flex items-end space-x-3">
        <p class="text-3xl font-bold text-left tracking-wider">{{ totalRead.length }}</p>
        <div class="flex items-center space-x-3 pb-1.5">
          <div class="flex flex-col">
            <span class="text-xxs uppercase leading-none">DE</span>
            <span class="text-xxs font-headline-md leading-none">{{ de }}</span>
          </div>
          <div class="w-px h-4 bg-gray-300" />
          <div class="flex flex-col">
            <span class="text-xxs uppercase leading-none">EN</span>
            <span class="text-xxs font-headline-md leading-none">{{ en }}</span>
          </div>
          <div class="w-px h-4 bg-gray-300" />
          <div class="flex flex-col">
            <span class="text-xxs uppercase leading-none">RU</span>
            <span class="text-xxs leading-none">{{ ru }}</span>
          </div>
        </div>
      </div>
      <p class="text-xs text-left text-muted-foreground mt-0.5">and {{ inProgress.length }} in progress</p>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { BookCheck } from '@lucide/vue'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const totalRead = books.filter((b: Book) => !b.hasFinished)
const inProgress = books.filter((b: Book) => b.hasFinished == undefined || b.hasFinished == null)
const [de, en, ru] = totalRead.reduce(
  (acc: [number, number, number], el: Book): [number, number, number] => {
    switch (el.language) {
      case 'DE':
        return [acc[0] + 1, acc[1], acc[2]]
      case 'EN':
        return [acc[0], acc[1] + 1, acc[2]]
      case 'RU':
        return [acc[0], acc[1], acc[2] + 1]
      default:
        return acc
    }
  },
  [0, 0, 0],
)
</script>
