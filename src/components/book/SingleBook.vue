<template>
  <div class="relative container mx-auto px-4 max-w-2xl">
    <BookControls
      v-model="mode"
      class="mb-8"
      :class="{ invisible: mode == 'editing' && hasScrolled }"
      :can-be-saved
      @back="goBack"
      @cancel="cancel"
      @save="() => saveBook(book)"
    />
    <BookForm
      v-if="mode == 'editing'"
      v-model:book="book"
      v-model:has-errors="hasErrors"
      @save="() => saveBook(book)"
    />
    <BookContent v-else :book />

    <BookControls
      v-if="mode == 'editing' && hasScrolled"
      v-model="mode"
      class="mt-8"
      :can-be-saved
      @back="goBack"
      @cancel="cancel"
      @save="() => saveBook(book)"
    />
  </div>
</template>

<script setup lang="ts">
import BookControls from '@/components/book/BookControls.vue'
import BookContent from '@/components/book/BookContent.vue'
import BookForm from '@/components/book/BookForm.vue'
import { bookStore } from '@/stores/book'
import { router } from '@/router/router'
import { isNewBook } from '@/types/guards'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { newBook, type Book, type NewBook } from '@/schemas/book'
import { computed, ref, watch } from 'vue'

const { getBook, createBook, updateBook } = bookStore()
const { request, isLoading } = useApi()

const defaultValues = { title: '', author: '' } as NewBook
const book = ref<Book | NewBook>({ ...defaultValues })
const mode = ref<BookControlsMode>('editing')
const hasChanges = ref(false)
const hasErrors = ref(false)
const canBeSaved = computed(() => hasChanges.value && !hasErrors.value)

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

function goBack() {
  if (hasChanges.value) {
    // TODO Navigation guard and modal
    return
  }
  router.back()
}

function cancel() {
  if (hasChanges.value) {
    // TODO Navigation guard and modal
    return
  }
  mode.value = 'viewing'
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
