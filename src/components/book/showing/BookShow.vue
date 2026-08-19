<template>
  <div
    ref="focused"
    tabindex="0"
    autofocus
    class="relative container mx-auto px-4 max-w-2xl outline-none"
    @keydown.delete="confirmDelete"
    @keydown.esc="$router.back()"
    @keydown.enter="edit"
  >
    <BookShowControls class="mb-8 2xl:mb-12" @back="$router.back()" @edit="edit" @delete="confirmDelete" />
    <template v-if="book">
      <BookContent :book />
      <DeleteGuardDialog v-model:open="isDeleteGuardOpen" :title="book.title" @delete-confirmed="removeBook" />
    </template>
  </div>
</template>

<script setup lang="ts">
import BookContent from '@/components/book/showing/BookContent.vue'
import BookShowControls from '@/components/book/showing/BookShowControls.vue'
import DeleteGuardDialog from '@/components/book/showing/DeleteGuardDialog.vue'
import { useBookStore } from '@/stores/book'
import { router } from '@/router/router'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute } from 'vue-router'
import { useFocus } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const { getBook, deleteBook } = useBookStore()
const { request, isLoading, error } = useApi()
const isDeleteGuardOpen = ref(false)

const { id } = useRoute().params
const book = Number.isInteger(+id) ? await request(() => getBook(+id)) : null
if (!book) {
  await router.replace({ name: '404', params: { pathMatch: '' } })
}

function confirmDelete() {
  isDeleteGuardOpen.value = true
}

function edit() {
  router.push({ name: 'edit', params: { id: book?.id } })
}

async function removeBook() {
  await request(() => deleteBook(book!.id))
  if (error.value) {
    toast.error(error.value)
  } else {
    toast.success(`«${book!.title}» was successfully deleted`)
    await router.push({ name: 'books' })
  }
}

const focused = useTemplateRef('focused')
useFocus(focused, { initialValue: true })
useGlobalSpinner().bindTo(isLoading)
</script>
