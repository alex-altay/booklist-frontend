<template>
  <div class="flex flex-col justify-center items-center select-none">
    <div class="relative mb-6">
      <div class="bg-muted w-20 h-20 rounded-full flex items-center justify-center">
        <Search class="w-8 h-8 text-muted-foreground" />
      </div>
      <div
        class="absolute -bottom-1 -right-1 bg-destructive/10 border border-destructive/20 rounded-full w-7 h-7 flex items-center justify-center"
      >
        <span class="text-destructive text-xs font-bold leading-none">0</span>
      </div>
    </div>
    <h3 class="mb-2 text-base font-semibold">No results found</h3>
    <p class="text-muted-foreground text-sm max-w-55 mx-auto mb-2 leading-relaxed">
      No books match the selected filters
    </p>
    <Button
      size="sm"
      class="mt-6 gap-2 hover:opacity-90 transition-opacity cursor-pointer"
      @click="$emit('resetFilter')"
    >
      <X class="w-4 h-4 mr-2" />
      Reset filter
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'

defineEmits(['resetFilter'])
</script>
