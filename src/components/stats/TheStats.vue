<template>
  <div class="flex flex-1 flex-col">
    <div v-if="books.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <TotalRead class="lg:col-start-1 lg:row-start-1 lg:row-span-1" :books />
        <TimeSpent class="lg:col-start-2 lg:row-start-1 lg:row-span-1" :books />
        <RandomQuote class="lg:col-start-3 sm:col-span-2 lg:col-span-3 lg:row-span-1" :books />
        <ReadingSpeed class="lg:col-start-1 sm:col-span-2 lg:col-span-2 lg:row-start-2" :books />
        <ReadByYears class="lg:col-start-3 lg:col-span-3 lg:row-start-2 lg:row-span-3" :books />
        <RatingDistribution class="lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:row-span-2" :books />
        <LongestBooks class="lg:col-start-1 lg:col-span-5 sm:col-span-2 lg:row-start-5 lg:row-end-6" :books />
      </div>
    </div>
    <EmptyStats v-else />
  </div>
</template>

<script setup lang="ts">
import EmptyStats from '@/components/stats/EmptyStats.vue'
import LongestBooks from '@/components/stats/widgets/LongestBooks.vue'
import RandomQuote from '@/components/stats/widgets/RandomQuote.vue'
import RatingDistribution from '@/components/stats/widgets/RatingDistribution.vue'
import ReadByYears from '@/components/stats/widgets/ReadByYears.vue'
import ReadingSpeed from '@/components/stats/widgets/ReadingSpeed.vue'
import TimeSpent from '@/components/stats/widgets/TimeSpent.vue'
import TotalRead from '@/components/stats/widgets/TotalRead.vue'
import { useBookStore } from '@/stores/book'

const { getBooks } = useBookStore()
const books = await getBooks()
</script>
