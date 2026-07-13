<template>
  <div class="flex flex-col items-center justify-center select-none">
    <div class="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-6">
      <BookOpen class="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 class="text-base font-semibold">Your list is empty</h3>
    <p class="text-muted-foreground text-sm max-w-55 mx-auto mt-2 leading-relaxed">
      Add your first book to see it here
    </p>
    <!-- TODO Push to add book route -->
    <Button size="sm" class="mt-6 gap-2 hover:opacity-90 transition-opacity cursor-pointer">
      <Plus class="w-4 h-4" />
      Add Book
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Plus, BookOpen } from '@lucide/vue'
</script>
