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
      <Button variant="outline" size="sm" class="gap-2 cursor-pointer" @click="$emit('cancel')">
        <X class="w-4 h-4" />
        Cancel
      </Button>
      <Button size="sm" class="gap-2 cursor-pointer" :disabled="!canBeSaved" @click="$emit('save')">
        <Check class="w-4 h-4" />
        Save
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HotKeys from '@/components/book/HotKeys.vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, X } from '@lucide/vue'

defineProps<{ canBeSaved: boolean }>()
defineEmits(['back', 'cancel', 'save'])

const hotKeys = {
  Cancel: ['Ctrl ⌃', '+', 'Delete ⌫'],
  Back: ['Esc'],
  'Save book': ['⌘', '+', 'Enter ⏎'],
}
</script>
