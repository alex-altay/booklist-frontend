<template>
  <div class="flex items-center justify-between">
    <Button variant="ghost" size="sm" class="gap-2 -ml-2 cursor-pointer" @click="$emit('back')">
      <ArrowLeft class="w-4 h-4" />
      Back
    </Button>

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
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, X } from '@lucide/vue'

defineProps<{ canBeSaved: boolean }>()
defineEmits(['back', 'cancel', 'save'])

// TODO Подписи на кнопках по наведению, если подержать
</script>
