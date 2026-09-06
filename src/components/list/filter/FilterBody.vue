<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <Label :for="id.search">Search</Label>
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          :id="id.search"
          v-model="filter.search"
          placeholder="Title or author..."
          class="pl-10 lg:placeholder:text-sm lg:text-sm"
        />
      </div>
    </div>

    <div class="space-y-2 w-full flex flex-col">
      <Label :for="id.rating">Rating</Label>
      <FormSelect :id="id.rating" v-model="filter.rating" empty-label="All ratings" :options="ratingOptions" />
    </div>

    <div class="space-y-2 w-full flex flex-col">
      <Label :for="id.category">Category</Label>
      <FormSelect :id="id.category" v-model="filter.category" empty-label="All categories" :options="categoryOptions" />
    </div>

    <div class="space-y-2 w-full flex flex-col">
      <Label :for="id.endYear">Finished in</Label>
      <FormSelect :id="id.endYear" v-model="filter.endYear" empty-label="All years" :options="yearOptions" />
    </div>

    <div class="space-y-2 w-full flex flex-col">
      <Label :for="id.language">Language</Label>
      <FormSelect :id="id.language" v-model="filter.language" empty-label="All languages" :options="languageOptions" />
    </div>

    <div class="mb-4 space-y-2 w-full flex flex-col">
      <Label :for="id.status" class="text-left">Status</Label>
      <FormSelect :id="id.status" v-model="filter.status" empty-label="All" :options="statusOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FormSelect } from '@/components/ui/form-select'
import { Search } from '@lucide/vue'
import { useIds } from '@/composables/useIds'
import { getSelectOptions } from '@/utils'
import { useFiltrationStore } from '@/stores/filtration'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const { years } = defineProps<{ years: number[] }>()
const filtrationStore = useFiltrationStore()
const { filter } = storeToRefs(filtrationStore)
const id = useIds('search', 'rating', 'category', 'endYear', 'language', 'status', 'accordion')
const { ratingOptions, categoryOptions, languageOptions, statusOptions } = getSelectOptions()
const yearOptions = computed(() => years.map((y) => ({ option: y, label: String(y) })))
</script>
