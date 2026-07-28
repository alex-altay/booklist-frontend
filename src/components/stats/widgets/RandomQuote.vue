<template>
  <Card class="p-6 flex items-start gap-4">
    <div class="w-full flex flex-row justify-between items-center">
      <span class="flex flex-row items-center">
        <span class="mr-2 bg-muted inline-block rounded-lg p-2.5">
          <Quote class="w-5 h-5 text-muted-foreground" />
        </span>
        <span class="text-xs text-muted-foreground uppercase tracking-wider">Random Quote</span>
      </span>
      <button
        v-if="withDescription.length > 1"
        class="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        @click="updateQuote()"
      >
        <RefreshCw class="w-3.5 h-3.5" />
      </button>
    </div>
    <template v-if="withDescription.length">
      <p class="text-sm text-left leading-relaxed text-foreground min-h-[3lh] line-clamp-3 italic">{{ quote }}</p>
      <p class="text-xs text-left text-muted-foreground line-clamp-1 truncate whitespace-normal">
        {{ title }}, {{ author }}
      </p>
    </template>
    <template v-else>
      <p class="text-sm text-left leading-relaxed text-foreground line-clamp-3 italic">
        Add notes to your books to see them here at random
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Quote, RefreshCw } from '@lucide/vue'
import { ref } from 'vue'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const withDescription = books.filter((b: Book) => b.description != null)

const quote = ref<string>('Add some description to your books to see your random notes here')
const author = ref<Book['author']>('')
const title = ref<Book['title']>('')
let previousIndex = -1

function getNewRandomIndex(): number {
  if (withDescription.length == 1) {
    return 0
  }
  let randomIndex = Math.floor(Math.random() * withDescription.length)
  while (randomIndex == previousIndex) {
    randomIndex = Math.floor(Math.random() * withDescription.length)
  }
  previousIndex = randomIndex
  return randomIndex
}

function updateQuote() {
  if (!withDescription.length) {
    return
  }
  const randomIndex = getNewRandomIndex()
  const randomBook = withDescription[randomIndex]
  quote.value = randomBook.description || ''
  author.value = randomBook.author
  title.value = randomBook.title
}

updateQuote()
</script>
