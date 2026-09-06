<template>
  <div class="w-full flex items-center justify-between pb-0 no-underline!">
    <h2 class="text-xl font-bold select-none">Filters</h2>
    <Button
      class="text-muted-foreground hover:text-foreground cursor-pointer"
      variant="ghost"
      size="sm"
      @click.stop="reset"
    >
      <X class="w-4 h-4 mr-2" />
      Reset
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useFiltrationStore } from '@/stores/filtration'
import { X } from '@lucide/vue'

const { reset } = useFiltrationStore()
</script>
