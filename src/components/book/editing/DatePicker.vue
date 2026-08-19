<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        :id
        variant="outline"
        :class="
          cn(
            'w-full min-w-60 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            hasDateError && 'border-destructive focus-visible:ring-destructive text-muted-foreground',
          )
        "
      >
        <CalendarIcon />
        {{ date ? formatDate(date.toDate(getLocalTimeZone()).toISOString()) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
        initial-focus
        @update:model-value="close"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { getLocalTimeZone, today, fromDate, type DateValue } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDate } from '@/utils'
import { ref, watch, computed, type Ref } from 'vue'

defineProps<{ hasDateError?: boolean; id: string }>()
const modelDate = defineModel<string | null | undefined>('date')
const initial = modelDate.value ? fromDate(new Date(modelDate.value), getLocalTimeZone()) : null
const date = ref(initial) as unknown as Ref<DateValue>
const defaultPlaceholder = computed(() => (date.value ? date.value : today(getLocalTimeZone())))

watch(date, () => {
  modelDate.value = date.value?.toDate(getLocalTimeZone()).toISOString()
})
</script>
