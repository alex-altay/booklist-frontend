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
/**
 * Widgets read books once during setup and do not track later changes.
 * That is deliberate: nothing on this page mutates books, so we don't need reactivity here.
 * The numbers are always actual because the component unmounts when you navigate
 * away and re-reads the store when you come back
 *
 * Two changes would break that silently: wrapping <RouterView /> in
 * <KeepAlive>, which keeps this component mounted across navigations with the same data
 * or adding mutatios on this page. In both cases wrap the books
 * inside each widget in computed()
 */
import EmptyStats from '@/components/stats/EmptyStats.vue'
import LongestBooks from '@/components/stats/widgets/LongestBooks.vue'
import RandomQuote from '@/components/stats/widgets/RandomQuote.vue'
import RatingDistribution from '@/components/stats/widgets/RatingDistribution.vue'
import ReadByYears from '@/components/stats/widgets/ReadByYears.vue'
import ReadingSpeed from '@/components/stats/widgets/ReadingSpeed.vue'
import TimeSpent from '@/components/stats/widgets/TimeSpent.vue'
import TotalRead from '@/components/stats/widgets/TotalRead.vue'
import { useBookStore } from '@/stores/book'
import { useApi } from '@/composables/useApi'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'

const { request } = useApi()
const bookStore = useBookStore()
const result = await request(() => bookStore.fetchBooks())
if (!result.ok && result.message) {
  toast.error(result.message)
}
const { books } = storeToRefs(bookStore)
</script>
