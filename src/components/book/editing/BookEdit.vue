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
      class="mb-8"
      :class="{ invisible: hasScrolled }"
      @back="goBack('list')"
      @cancel="goBack('show')"
      @save="saveBook(draft)"
    />

    <BookForm v-model:draft="draft" v-model:has-errors="hasErrors" />
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
import { bookStore } from '@/stores/book'
import { isNewBook, GuardReject, GuardResolve } from '@/types/guards'
import { onBeforeRouteLeave } from 'vue-router'
import { router } from '@/router/router'
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/useApi'
import { useGlobalSpinner } from '@/composables/useGlobalSpinner'
import { useRoute } from 'vue-router'
import { useWindowScroll, useFocus } from '@vueuse/core'
import { type Book, type NewBook } from '@/schemas/book'
import { computed, ref, watch, useTemplateRef } from 'vue'

const { getBook, createBook, updateBook } = bookStore()
const { request, isLoading, error } = useApi()

const defaultValues = { title: '', author: '' } as NewBook
const book = ref<Book | NewBook>({ ...defaultValues })
const draft = ref<Book | NewBook>({ ...defaultValues })
const route = useRoute()
const { id } = route.params
if (id) {
  book.value = await getBook(+id)
  draft.value = { ...book.value }
}

const hasErrors = ref(false)
const hasChanges = ref(false)
const canBeSaved = computed(() => hasChanges.value && !hasErrors.value)
const isReturnGuardOpen = ref(false)

async function saveBook(bookToSave: Book | NewBook) {
  if (!canBeSaved.value) {
    return
  }
  if (isNewBook(bookToSave)) {
    await request(() => createBook(bookToSave))
  } else {
    await request(() => updateBook(bookToSave as Book))
  }
  if (error.value) {
    toast.error(error.value)
  } else {
    toast.success(`«${bookToSave.title}» has been saved`)
    hasChanges.value = false
    router.push({ name: 'books' })
  }
}

function goBack(target: 'list' | 'show') {
  if (target == 'show' && 'id' in book.value) {
    router.push({ name: 'book', params: { id: book.value.id } })
  } else {
    router.push({ name: 'books' })
  }
}

watch(
  draft,
  () => {
    hasChanges.value = JSON.stringify(draft.value) != JSON.stringify(book.value)
  },
  { deep: true },
)

watch(route, () => {
  book.value = { ...defaultValues }
  draft.value = { ...defaultValues }
  hasErrors.value = false
  hasChanges.value = false
  isReturnGuardOpen.value = false
})

const { setSpinnerState } = useGlobalSpinner()
watch(isLoading, () => setSpinnerState(isLoading.value))

const focused = useTemplateRef('focused')
useFocus(focused, { initialValue: true })

const guardReject = ref<GuardReject>(() => {})
const guardResolve = ref<GuardResolve>(() => {})
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
