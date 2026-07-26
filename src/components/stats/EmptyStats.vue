<template>
  <div class="flex flex-col flex-1 justify-center select-none items-center border w-full rounded-2xl p-6">
    <div class="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-6">
      <HeartPulse class="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 class="text-base font-semibold">Your reading statistics will appear here</h3>
    <p class="text-muted-foreground text-sm max-w-55 mx-auto mt-2 leading-relaxed">
      Add your first book, and we'll start analyzing your reading habits and preferences
    </p>
    <Button
      size="sm"
      class="mt-6 gap-2 hover:opacity-90 transition-opacity cursor-pointer"
      @click="$router.push({ name: 'add' })"
    >
      <Plus class="w-4 h-4" />
      Add Book
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus, HeartPulse } from '@lucide/vue'
</script>
