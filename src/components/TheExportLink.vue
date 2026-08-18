<template>
  <button class="hover:text-primary transition-colors cursor-pointer select-none" @click="downloadBooks">
    Data Export
  </button>
</template>

<script setup lang="ts">
import { useBookStore } from '@/stores/book'
import { booksToCSV } from '@/utils/booksToCSV'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'

const fileName = 'export.csv'
const { request, error } = useApi()

async function downloadBooks() {
  const promise = async () => {
    const books = (await request(() => useBookStore().getBooks())) || []
    if (error.value) {
      throw new Error(error.value)
    }
    const content = booksToCSV(books)
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
