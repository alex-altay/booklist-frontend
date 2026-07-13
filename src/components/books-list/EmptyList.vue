<template>
  <div class="flex flex-col justify-center items-center border w-full rounded-2xl p-6">
    <EmptyListNewUser v-if="isNewUser" />
    <EmptyListFiltered v-else @reset-filter="$emit('resetFilter')" />
  </div>
</template>

<script setup lang="ts">
import EmptyListFiltered from '@/components/books-list/EmptyListFiltered.vue'
import EmptyListNewUser from '@/components/books-list/EmptyListNewUser.vue'

defineProps<{ isNewUser: boolean }>()
defineEmits(['resetFilter'])
</script>
