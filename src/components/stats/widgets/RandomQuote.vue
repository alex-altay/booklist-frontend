<template>
  <Card class="p-6 flex justify-between gap-4">
    <div class="w-full flex flex-row justify-between items-center">
      <span class="flex flex-row items-center">
        <span class="mr-4 p-2.5 bg-muted inline-block rounded-lg">
          <Quote class="w-5 h-5 text-muted-foreground" />
        </span>
        <span class="text-xs text-muted-foreground uppercase tracking-wider select-none">Random Quote</span>
      </span>
      <button
        v-if="withDescription.length > 1"
        class="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        @click.stop="updateQuote()"
      >
        <RefreshCw class="w-3.5 h-3.5" />
      </button>
    </div>
    <template v-if="withDescription.length">
      <p
        class="min-h-[3lh] text-sm text-foreground text-left leading-relaxed line-clamp-3 select-none"
        :class="{ shimmer: isAnimated }"
      >
        {{ quote }}
      </p>
      <RouterLink
        class="text-xs text-left text-muted-foreground line-clamp-1 truncate whitespace-normal cursor-pointer"
        :class="{ shimmer: isAnimated }"
        :to="{ name: 'book', params: { id } }"
      >
        {{ title }}, {{ author }}
      </RouterLink>
    </template>
    <template v-else>
      <p class="text-sm text-left leading-relaxed text-muted-foreground line-clamp-3 italic">
        Add notes to your books to see them here at random
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Quote, RefreshCw } from '@lucide/vue'
import { type Book } from '@/schemas/book'
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

const { books } = defineProps<{ books: Book[] }>()

const isAnimated = ref(false)
const removeAnimation = useTimeoutFn(() => (isAnimated.value = false), 500)
const id = ref<Book['id']>(-1)
const author = ref<Book['author']>('')
const title = ref<Book['title']>('')
const quote = ref<string>('')
const withDescription = books.filter((b: Book) => b.description !== null)

function getNewRandomIndex(): number {
  if (withDescription.length === 1) {
    return 0
  }
  let randomIndex = Math.floor(Math.random() * withDescription.length)
  while (withDescription[randomIndex].id === id.value) {
    randomIndex = Math.floor(Math.random() * withDescription.length)
  }
  return randomIndex
}

function updateQuote() {
  if (!withDescription.length) {
    return
  }
  isAnimated.value = true
  removeAnimation.start()
  const randomIndex = getNewRandomIndex()
  const randomBook = withDescription[randomIndex]
  quote.value = randomBook.description || ''
  author.value = randomBook.author
  title.value = randomBook.title
  id.value = randomBook.id
}

updateQuote()
</script>

<style scoped>
.shimmer {
  animation: shimmer 500ms ease-in-out both;
}

@keyframes shimmer {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
