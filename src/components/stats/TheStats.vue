<template>
  <div class="flex flex-1 flex-col justify-center">
    <div v-if="true">TODO Stats</div>
    <EmptyStats v-else />
  </div>
</template>

<script setup lang="ts">
import EmptyStats from '@/components/stats/EmptyStats.vue'
</script>
