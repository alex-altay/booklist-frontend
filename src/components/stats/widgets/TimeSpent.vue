<template>
  <Card class="p-6 flex justify-between gap-4">
    <div class="flex items-center justify-start">
      <div class="p-2.5 mr-4 bg-muted rounded-lg">
        <Watch class="w-5 h-5 text-muted-foreground" />
      </div>
      <p class="inline-block text-left text-xs text-muted-foreground uppercase tracking-wider">Time Spent</p>
    </div>
    <div class="flex items-end space-x-3">
      <p class="text-3xl font-bold text-left tracking-wider">
        <RollingDigit :digit="totalDays" />
      </p>
    </div>
    <p class="mt-0.5 text-xs text-left text-muted-foreground">days total</p>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { RollingDigit } from '@/components/ui/rolling-digit'
import { Watch } from '@lucide/vue'
import { getDaysDuration } from '@/utils'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const totalDays = books.reduce((acc, b) => acc + getDaysDuration(b), 0)
</script>
