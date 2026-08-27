<template>
  <Select v-model="model">
    <SelectTrigger :id class="w-full">
      <SelectValue class="text-base lg:text-sm" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem class="text-base lg:text-sm" :value="null">{{ emptyLabel }}</SelectItem>
      <SelectItem  class="text-base lg:text-sm" v-for="{ label, option } in options" :key="label" :value="option" >
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
