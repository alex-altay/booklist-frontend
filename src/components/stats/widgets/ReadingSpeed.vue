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
      <div v-for="(speed, lang) in speedByLanguage" :key="lang" class="grow">
        <div class="mb-0.5 flex flex-row justify-between">
          <span>{{ languageMap[lang] }}</span
          >&nbsp;
          <span>{{ speed }}</span>
        </div>
        <div class="relative h-2 bg-gray-300 rounded-xs overflow-hidden">
          <div
            class="grow-right absolute top-0 left-0 h-full bg-gray-900 rounded-xs"
            :style="{ width: `${Math.round((speed / minSpeed) * 100)}%` }"
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
import { languageMap } from '@/utils'
import { MS } from '@/utils/date'
import type { Book, Language } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const spendByLanguage: Record<Language, [number, number]> = {
  DE: [0, 0],
  EN: [0, 0],
  RU: [0, 0],
}
for (const book of books) {
  if (!book.language || !book.startDate || !book.endDate) {
    continue
  }
  spendByLanguage[book.language][0] += new Date(book.endDate).getTime() - new Date(book.startDate).getTime()
  spendByLanguage[book.language][1]++
}

const [totalSpend, totalCount] = Object.values(spendByLanguage).reduce(
  (acc: [number, number], el: [number, number]) => [acc[0] + el[0], acc[1] + el[1]],
  [0, 0],
)
const totalSpeed = totalCount && totalSpend ? Math.round((totalSpend / totalCount / MS) * 10) / 10 : 0

let minSpeed = 0
const speedByLanguage: Record<Language, number> = { DE: 0, EN: 0, RU: 0 }
for (const lang of Object.keys(spendByLanguage) as Language[]) {
  const [spend, count] = spendByLanguage[lang]
  const langSpeed = Math.round(spend / count / MS) || 0
  speedByLanguage[lang] = langSpeed
  minSpeed = Math.max(langSpeed, minSpeed)
}
</script>

<style scoped>
.grow-right {
  animation: grow 1s ease-in-out;
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
