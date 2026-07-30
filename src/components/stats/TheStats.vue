<template>
  <div class="flex flex-1 flex-col">
    <div v-if="books.length">
      <!-- <div class="text-2xl text-left font-bold mb-8">Statistics</div> -->
      <div class="flex flex-col gap-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <TotalRead :books />
          <ReadingSpeed :books />
          <RandomQuote :books />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RatingDistribution :books />
          <ReadByYears :books />
        </div>
      </div>
    </div>
    <EmptyStats v-else />
  </div>
</template>

<script setup lang="ts">
import EmptyStats from '@/components/stats/EmptyStats.vue'
import RandomQuote from '@/components/stats/widgets/RandomQuote.vue'
import RatingDistribution from '@/components/stats/widgets/RatingDistribution.vue'
import ReadByYears from '@/components/stats/widgets/ReadByYears.vue'
import ReadingSpeed from '@/components/stats/widgets/ReadingSpeed.vue'
import TotalRead from '@/components/stats/widgets/TotalRead.vue'
import { bookStore } from '@/stores/book'

const { getBooks } = bookStore()
const books = await getBooks()
</script>
