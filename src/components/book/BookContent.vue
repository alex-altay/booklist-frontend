<template>
  <!-- TODO Book Content -->
  {{ book }}
</template>

<script setup lang="ts">
import type { Book, NewBook } from '@/schemas/book/book'

defineProps<{ book: Book | NewBook }>()
</script>
