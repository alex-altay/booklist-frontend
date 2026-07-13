<template>
  <div>
    <BookControls v-model="mode" :can-be-saved @back="goBack" @cancel="goBack" />
    <!-- TODO Add Book -->
    <div>Add Book</div>
  </div>
</template>

<script setup lang="ts">
import BookControls from '@/components/single-book/BookControls.vue'
import { router } from '@/router/router'
import { ref } from 'vue'

const mode = ref<BookControlsMode>('editing')
const canBeSaved = ref(false)

function goBack() {
  if (canBeSaved.value) {
    // TODO Navigation guard and modal
  } else {
    router.back()
  }
}
</script>
