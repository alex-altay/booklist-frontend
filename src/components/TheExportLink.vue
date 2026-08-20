<template>
  <button
    class="inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer select-none"
    :disabled="isLoading"
    @click="downloadBooks"
  >
    <Download class="w-3.5 h-3.5" />
    Data Export
  </button>
</template>

<script setup lang="ts">
import { Download } from '@lucide/vue'
import { useBookStore } from '@/stores/book'
import { booksToCSV } from '@/utils'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'

const fileName = 'export.csv'
const bookStore = useBookStore()
const { request, error, isLoading } = useApi()

async function downloadBooks() {
  const promise = async () => {
    await request(() => bookStore.fetchBooks())
    if (error.value) {
      throw new Error(error.value)
    }
    const content = booksToCSV(bookStore.books)
    const file = new Blob([content], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }
  toast.promise(promise, {
    loading: 'Preparing your books...',
    success: () => 'Your books are ready for saving',
    error: () => 'Something went wrong. Try again later',
  })
}
</script>
