<template>
  <Card class="p-6 flex justify-between gap-4">
    <div class="flex items-center justify-start">
      <div class="p-2.5 mr-4 bg-muted rounded-lg">
        <Timer class="w-5 h-5 text-muted-foreground" />
      </div>
      <p class="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reading Speed</p>
    </div>
    <div class="text-left">
      <p>
        <span class="mr-1 text-3xl text-left font-bold">
          <RollingDigit :digit="totalSpeed" />
        </span>
        <span class="text-xs text-muted-foreground mt-0.5 truncate">days / book</span>
      </p>
    </div>
    <div class="flex flex-row w-full justify-between flex-wrap gap-4 text-xs">
      <div v-for="(speed, lang) in daysPerBookByLanguage" :key="lang" class="grow">
        <div class="mb-0.5 flex flex-row justify-between">
          <span>{{ languageMap[lang] }}</span
          >&nbsp;
          <span>{{ speed }}</span>
        </div>
        <div class="relative h-2 bg-muted rounded-xs overflow-hidden">
          <div
            class="grow-right absolute top-0 left-0 h-full bg-foreground rounded-xs"
            :style="{ width: `${Math.round((speed / (slowestSpeed || 1)) * 100)}%` }"
          />
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { RollingDigit } from '@/components/ui/rolling-digit'
import { Timer } from '@lucide/vue'
import { languageMap, MS_PER_DAY } from '@/utils'
import type { Book, Language } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()

let totalMs = 0
let totalBooks = 0
const msByLanguage: Record<Language, { msCount: number; bookCount: number }> = {
  DE: { msCount: 0, bookCount: 0 },
  EN: { msCount: 0, bookCount: 0 },
  RU: { msCount: 0, bookCount: 0 },
}

for (const book of books) {
  if (!book.language || !book.startDate || !book.endDate) {
    continue
  }
  const duration = new Date(book.endDate).getTime() - new Date(book.startDate).getTime()
  totalMs += duration
  msByLanguage[book.language].msCount += duration
  totalBooks++
  msByLanguage[book.language].bookCount++
}

let slowestSpeed = 0
const totalSpeed = totalBooks && totalMs ? Math.round((totalMs / totalBooks / MS_PER_DAY) * 10) / 10 : 0
const daysPerBookByLanguage: Record<Language, number> = { DE: 0, EN: 0, RU: 0 }
for (const lang of Object.keys(msByLanguage) as Language[]) {
  const { msCount, bookCount } = msByLanguage[lang]
  const langSpeed = Math.round(msCount / bookCount / MS_PER_DAY) || 0
  daysPerBookByLanguage[lang] = langSpeed
  slowestSpeed = Math.max(langSpeed, slowestSpeed)
}
</script>

<style scoped>
.grow-right {
  animation: grow 500ms ease-in-out;
}

@keyframes grow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
