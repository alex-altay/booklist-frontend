<template>
  <div
    ref="focused"
    tabindex="0"
    autofocus
    class="relative container mx-auto px-4 max-w-2xl outline-none"
    @keydown.ctrl.delete="goBack('show')"
    @keydown.esc.prevent="goBack('list')"
    @keydown.ctrl.enter="saveBook(draft)"
    @keydown.meta.enter="saveBook(draft)"
  >
    <BookEditControls
      :can-be-saved
      class="mb-8 2xl:mb-12"
      :class="{ invisible: hasScrolled }"
      @back="goBack('list')"
      @cancel="goBack('show')"
      @save="saveBook(draft)"
    />

    <BookForm v-model:draft="draft" :has-date-error />
    <ReturnGuardDialog v-model:open="isReturnGuardOpen" :reject="guardReject" :resolve="guardResolve" />

    <BookEditControls
      v-if="hasScrolled"
      :can-be-saved
      class="mt-8"
      @back="goBack('list')"
      @cancel="goBack('show')"
      @save="saveBook(draft)"
    />
  </div>
</template>

<script setup lang="ts">
import BookEditControls from '@/components/book/editing/BookEditControls.vue'
import BookForm from '@/components/book/editing/BookForm.vue'
import ReturnGuardDialog from '@/components/book/editing/ReturnGuardDialog.vue'
import { useBookStore } from '@/stores/book'
import type { DialogReject, DialogResolve } from '@/types/dialog'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { router } from '@/router/router'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useWindowScroll, useFocus } from '@vueuse/core'
import { newBook, type Book, type NewBook } from '@/schemas/book'
import { areBooksEqual } from '@/utils'
import { computed, ref, useTemplateRef } from 'vue'

const { getBook, createBook, updateBook } = useBookStore()
const { request, isLoading, error } = useApi()

const defaultValues: NewBook = {
  title: '',
  author: '',
  language: null,
  category: null,
  startDate: null,
  endDate: null,
  rating: null,
  status: null,
  description: null,
}
const book = ref<Book | NewBook>({ ...defaultValues })
const draft = ref<Book | NewBook>({ ...defaultValues })

const route = useRoute()
const { id } = route.params
if (Number.isInteger(+id)) {
  const existedBook = await request(() => getBook(+id))
  if (existedBook) {
    book.value = existedBook
    draft.value = { ...book.value }
  } else {
    await router.replace({ name: '404', params: { pathMatch: '' } })
  }
}

const isReturnGuardOpen = ref(false)
const hasChanges = computed(() => !areBooksEqual(draft.value, book.value))
const hasDateError = computed(() =>
  Boolean(
    draft.value.startDate && draft.value.endDate && new Date(draft.value.endDate) < new Date(draft.value.startDate),
  ),
)
const hasErrors = computed(() => !newBook.safeParse(draft.value).success || hasDateError.value)
const canBeSaved = computed(() => hasChanges.value && !hasErrors.value)

async function saveBook(bookToSave: Book | NewBook) {
  if (!canBeSaved.value) {
    return
  }
  const savedBook =
    'id' in bookToSave ? await request(() => updateBook(bookToSave)) : await request(() => createBook(bookToSave))

  if (savedBook) {
    book.value = savedBook
  }

  if (error.value) {
    toast.error(error.value)
  } else {
    toast.success(`«${bookToSave.title}» has been saved`)
    router.push({ name: 'books' })
  }
}

function goBack(target: 'list' | 'show') {
  if (target === 'show' && 'id' in book.value) {
    router.push({ name: 'book', params: { id: book.value.id } })
  } else {
    router.push({ name: 'books' })
  }
}

const focused = useTemplateRef('focused')
useFocus(focused, { initialValue: true })
useGlobalSpinner().bindTo(isLoading)

const guardReject = ref<DialogReject>(() => {})
const guardResolve = ref<DialogResolve>(() => {})
async function leaveGuard() {
  if (!hasChanges.value) {
    return true
  }
  return await new Promise<boolean>((resolve, reject) => {
    guardReject.value = reject
    guardResolve.value = resolve
    isReturnGuardOpen.value = true
  })
    .then(() => true)
    .catch(() => false)
}
onBeforeRouteLeave(leaveGuard)

const { y } = useWindowScroll()
const TOP_CONTROLS_BUTTON_POSITION = 64
const hasScrolled = computed(() => y.value > TOP_CONTROLS_BUTTON_POSITION)
</script>
