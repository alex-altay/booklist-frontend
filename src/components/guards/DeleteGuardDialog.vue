<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="select-none">Delete Book?</AlertDialogTitle>
        <AlertDialogDescription class="select-none">
          «{{ title }}» will be removed from your list. This action cannot be undone
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
          @click="$emit('delete-confirmed')"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Book } from '@/schemas/book'

defineProps<{ title: Book['title'] }>()
defineEmits(['delete-confirmed'])
const open = defineModel<boolean>('open', { required: true })
</script>
