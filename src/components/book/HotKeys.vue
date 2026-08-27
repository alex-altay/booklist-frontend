<template>
  <div class="hidden lg:inline-block">
    <Popover>
      <PopoverTrigger as-child>
        <KeyboardIcon class="w-4 h-4 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent class="max-w-80">
        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Shortcuts</p>
        <div v-for="(keys, label) in hotKeys" :key="label" class="mb-1.5 flex items-center justify-between gap-8">
          <span class="text-xs text-muted-foreground">{{ label }}</span>
          <KbdGroup class="flex items-center gap-1">
            <Kbd v-for="k in keys" :key="k">{{ k }}</Kbd>
          </KbdGroup>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { KeyboardIcon } from '@lucide/vue'

defineProps<{ hotKeys: Record<string, string[]> }>()
</script>
