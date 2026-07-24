<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="select-none">Cancel changes?</AlertDialogTitle>
        <AlertDialogDescription class="select-none">
          Unsaved changes will be lost. This action cannot be undone
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer" @click="reject">Continue editing</AlertDialogCancel>
        <AlertDialogAction class="bg-destructive text-white hover:bg-destructive/90 cursor-pointer" @click="resolve">
          Cancel changes
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
import { GuardReject, GuardResolve } from '@/types/guards'

defineEmits(['return-confirmed'])
const open = defineModel<boolean>('open', { required: true })
defineProps<{
  reject: GuardReject
  resolve: GuardResolve
}>()
</script>
