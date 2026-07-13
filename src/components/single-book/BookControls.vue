<template>
  <div class="flex items-center justify-between mb-8">
    <Button variant="ghost" size="sm" class="gap-2 -ml-2 cursor-pointer" @click="$emit('back')">
      <ArrowLeft class="w-4 h-4" />
      Back
    </Button>

    <div class="flex items-center gap-2">
      <template v-if="mode == 'viewing'">
        <Button
          variant="ghost"
          size="sm"
          class="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
          @click="$emit('delete')"
        >
          <Trash2 class="w-4 h-4" />
          <span class="hidden sm:inline">Delete</span>
        </Button>
        <Button
          size="sm"
          class="gap-2 cursor-pointer"
          @click="() => (mode = mode == 'editing' ? 'viewing' : 'editing')"
        >
          <Pencil class="w-4 h-4" />
          Edit
        </Button>
      </template>

      <template v-else>
        <Button variant="outline" size="sm" class="gap-2 cursor-pointer" @click="$emit('cancel')">
          <X class="w-4 h-4" />
          Cancel
        </Button>
        <Button size="sm" class="gap-2 cursor-pointer" :disabled="!canBeSaved" @click="$emit('save')">
          <Check class="w-4 h-4" />
          Save
        </Button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Pencil, X, Trash2 } from '@lucide/vue'

defineProps<{ canBeSaved: boolean }>()
defineEmits(['back', 'cancel', 'delete', 'edit', 'save'])
const mode = defineModel<BookControlsMode>({ required: true })
</script>
