<template>
  <aside class="lg:col-span-1">
    <div class="top-24">
      <div class="space-y-6 bg-card p-6 rounded-xl border">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold select-none">Filters</h2>
          <Button
            class="text-muted-foreground hover:text-foreground cursor-pointer"
            variant="ghost"
            size="sm"
            @click="$emit('resetFilter')"
          >
            <X class="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="search">Search</Label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="search"
                v-model:model-value="model.search"
                placeholder="Title or author..."
                class="pl-10"
                :value="model.search"
              />
            </div>
          </div>

          <div class="space-y-2 w-full flex flex-col">
            <Label>Rating</Label>
            <Select v-model:model-value="model.rating" :value="model.rating">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="All ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> All ratings </SelectItem>
                <SelectItem v-for="{ rating, score, label } of ratingOptions" :key="rating" :value="rating">
                  {{ score }} — {{ label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2 w-full flex flex-col">
            <Label>Category</Label>
            <Select v-model:model-value="model.category" :value="model.category">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Any category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> Any category </SelectItem>
                <SelectItem v-for="category of categories" :key="category" :value="category">
                  {{ capitalizeProperty(category) }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2 w-full flex flex-col">
            <Label>Finished in</Label>
            <Select v-model:model-value="model.endYear" :value="model.endYear">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="All years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> All years </SelectItem>
                <SelectItem v-for="y in years" :key="y" :value="y.toString()">
                  {{ y }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2 w-full flex flex-col">
            <Label>Language</Label>
            <Select v-model:model-value="model.language">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="All languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> All languages </SelectItem>
                <SelectItem v-for="l in languages" :key="l" :value="l">
                  {{ languageMap[l] }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2 w-full flex flex-col">
            <Label class="text-left">Status</Label>
            <Select v-model:model-value="hasFinishedStringified">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undefined"> All </SelectItem>
                <SelectItem value="true"> Finished </SelectItem>
                <SelectItem value="false"> Not finished </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Search } from '@lucide/vue'
import { categories, languages } from '@/schemas/book'
import { capitalizeProperty } from '@/utils/capitalize'
import { languageMap, ratingOptions } from '@/utils/maps'
import { computed } from 'vue'

defineEmits(['resetFilter'])
defineProps<{ years: number[] }>()
const model = defineModel<Filter>({ required: true })

const hasFinishedStringified = computed({
  get: () => {
    if (model.value.hasFinished === undefined) {
      return 'undefined'
    }
    return String(model.value.hasFinished)
  },
  set: (value: string) => {
    if (value === 'undefined') {
      model.value.hasFinished = undefined
    } else {
      model.value.hasFinished = value === 'true'
    }
  },
})
</script>
