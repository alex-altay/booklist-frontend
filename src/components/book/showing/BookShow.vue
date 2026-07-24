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
    <BookShowControls class="mb-8" @back="$router.back()" @edit="edit" @delete="confirmDelete" />
    <BookContent :book />
    <DeleteGuardDialog v-model:open="isDeleteGuardOpen" :title="book.title" @delete-confirmed="removeBook" />
  </div>
</template>

<script setup lang="ts">
import BookContent from '@/components/book/showing/BookContent.vue'
import BookShowControls from '@/components/book/showing/BookShowControls.vue'
import DeleteGuardDialog from '@/components/book/showing/DeleteGuardDialog.vue'
import { bookStore } from '@/stores/book'
import { router } from '@/router/router'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute } from 'vue-router'
import { useFocus } from '@vueuse/core'
import { ref, watch, useTemplateRef } from 'vue'

const { getBook, deleteBook } = bookStore()
const { request, isLoading } = useApi()
const isDeleteGuardOpen = ref(false)

const { id } = useRoute().params
const book = await getBook(+id)
if (!id || !book) {
  router.push({ name: '404' })
}

function confirmDelete() {
  isDeleteGuardOpen.value = true
}

function edit() {
  router.push({ name: 'edit', params: { id: book.id } })
}

async function removeBook() {
  await request(() => deleteBook(book.id))
  toast.success(`«${book.title}» was successfully deleted`)
  await router.push({ name: 'books' })
}

const focused = useTemplateRef('focused')
useFocus(focused, { initialValue: true })

const { setSpinnerState } = useGlobalSpinner()
watch(isLoading, () => setSpinnerState(isLoading.value))
</script>
