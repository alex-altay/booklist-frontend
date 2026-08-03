<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-row gap-2 items-center">
      <Button variant="ghost" size="sm" class="gap-2 -ml-2 cursor-pointer" @click="$emit('back')">
        <ArrowLeft class="w-4 h-4" />
        Back
      </Button>
      <HotKeys :hot-keys />
    </div>

    <div class="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        class="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
        @click="$emit('delete')"
      >
        <Trash2 class="w-4 h-4" />
        <span class="hidden sm:inline">Delete</span>
      </Button>
      <Button size="sm" class="gap-2 cursor-pointer" @click="$emit('edit')">
        <Pencil class="w-4 h-4" />
        Edit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HotKeys from '@/components/book/HotKeys.vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Pencil, Trash2 } from '@lucide/vue'

defineEmits(['back', 'delete', 'edit'])
const hotKeys = {
  'Edit book': ['Enter ⏎'],
  'Delete book': ['⌘', '+', 'Delete ⌫'],
  Back: ['Esc'],
}
</script>
