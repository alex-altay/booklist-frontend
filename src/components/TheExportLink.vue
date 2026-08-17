<template>
  <a
    :href
    :download="fileName"
    class="hover:text-primary transition-colors cursor-pointer select-none"
    @click="downloadBooks"
  >
    Data Export
  </a>
</template>

<script setup lang="ts">
import { bookStore } from '@/stores/book'
import { booksToCSV } from '@/utils/booksToCSV'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

const fileName = 'export.csv'
const href = ref(fileName)

async function downloadBooks() {
  const promise = async () => {
    const { request } = useApi()
    const books = (await request(() => bookStore().getBooks())) || []
    const content = booksToCSV(books)
    const file = new Blob([content], { type: 'text/csv;charset=utf-8' })
    href.value = URL.createObjectURL(file)
  }
  toast.promise(promise, {
    loading: 'Preparing your books...',
    success: () => 'Your books are ready for saving',
    error: () => 'Something got wrong. Try again later',
  })
}
</script>
