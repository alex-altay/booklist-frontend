<template>
  <div class="relative container mx-auto px-4 max-w-2xl">
    <BookControls
      v-model="mode"
      class="mb-8"
      :class="{ invisible: mode == 'editing' && hasScrolled }"
      :can-be-saved
      @delete="confirmDelete(book)"
      @back="confirmReturn"
      @cancel="confirmReturn"
      @save="saveBook(book)"
    />
    <BookForm v-if="mode == 'editing'" v-model:book="book" v-model:has-errors="hasErrors" @save="saveBook(book)" />
    <BookContent v-else :book @back="goBack" @delete="confirmDelete(book)" @edit="() => (mode = 'editing')" />

    <BookControls
      v-if="mode == 'editing' && hasScrolled"
      v-model="mode"
      class="mt-8"
      :can-be-saved
      @back="confirmReturn"
      @cancel="confirmReturn"
      @save="saveBook(book)"
    />

    <DeleteGuardDialog v-model:open="isDeleteGuardOpen" :title="book.title" @delete-confirmed="removeBook(book)" />
    <ReturnGuardDialog v-model:open="isReturnGuardOpen" @return-confirmed="goBack" />
  </div>
</template>

<script setup lang="ts">
import BookControls from '@/components/book/BookControls.vue'
import BookContent from '@/components/book/BookContent.vue'
import BookForm from '@/components/book/BookForm.vue'
import DeleteGuardDialog from '@/components/guards/DeleteGuardDialog.vue'
import ReturnGuardDialog from '@/components/guards/ReturnGuardDialog.vue'
import { bookStore } from '@/stores/book'
import { router } from '@/router/router'
import { isBook, isNewBook } from '@/types/guards'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { newBook, type Book, type NewBook } from '@/schemas/book'
import { computed, ref, watch } from 'vue'

const { getBook, createBook, updateBook, deleteBook } = bookStore()
const { request, isLoading } = useApi()

const defaultValues = { title: '', author: '' } as NewBook
const book = ref<Book | NewBook>({ ...defaultValues })
const mode = ref<BookControlsMode>('editing')
const hasChanges = ref(false)
const hasErrors = ref(false)
const canBeSaved = computed(() => hasChanges.value && !hasErrors.value)
const isDeleteGuardOpen = ref(false)
const isReturnGuardOpen = ref(false)

const { id } = useRoute().params
if (id) {
  book.value = await getBook(+id)
  mode.value = 'viewing'
}

async function saveBook(bookToSave: Book | NewBook) {
  if (!canBeSaved.value) {
    return
  }
  if (isNewBook(bookToSave)) {
    const { success, data } = newBook.safeParse(bookToSave)
    if (!success) {
      return
    }
    await request(() => createBook(data))
    book.value = { ...defaultValues }
  } else {
    await request(() => updateBook(bookToSave as Book))
  }
  hasChanges.value = false
  // TODO Popup with success or modal with choice what to do next
}

// TODO This component is too big. Refactor it
// TODO Add key controls to edit mode too
// TODO Guards on route change, on browser attempt

function confirmReturn() {
  if (hasChanges.value) {
    isReturnGuardOpen.value = true
  } else {
    goBack()
  }
}

// TODO Move to draft, do not change source data. It comes to errors when you change mode, discard something, than change mode back
function goBack() {
  if (mode.value == 'editing') {
    mode.value = 'viewing'
  } else {
    router.back()
  }
}

function confirmDelete(book: Book | NewBook) {
  if (isNewBook(book)) {
    return
  }
  isDeleteGuardOpen.value = true
}

async function removeBook(book: Book | NewBook) {
  if (isBook(book)) {
    await request(() => deleteBook(book.id))
    router.push({ name: 'books' })
  }
}

watch(
  book,
  () => {
    if (!hasChanges.value) {
      hasChanges.value = true
    }
  },
  { deep: true },
)

const { setSpinnerState } = useGlobalSpinner()
watch(isLoading, () => setSpinnerState(isLoading.value))

const { y } = useWindowScroll()
const TOP_CONTROLS_BUTTON_POSITION = 64
const hasScrolled = computed(() => y.value > TOP_CONTROLS_BUTTON_POSITION)
</script>
