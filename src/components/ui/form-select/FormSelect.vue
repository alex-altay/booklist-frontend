<template>
  <Select v-model="model">
    <SelectTrigger :id class="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem :value="null">{{ emptyLabel }}</SelectItem>
      <SelectItem v-for="{ label, option } in options" :key="label" :value="option" >
        {{ label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select'

type SelectOption = { 
  label: string, 
  option: string | number
}

const model = defineModel<string | number | null>({ required: true})
withDefaults(
  defineProps<{
    id: string,
    emptyLabel?: string,
    options: readonly SelectOption[]
  }>(), { emptyLabel: 'Not chosen' }
)
</script>
