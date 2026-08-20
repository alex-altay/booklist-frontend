<template>
  <form @submit.prevent>
    <div class="space-y-6 2xl:space-y-12">
      <div class="space-y-2">
        <Label :for="id.title">Title<span class="text-destructive">*</span></Label>
        <Input :id="id.title" v-model="draft.title" class="text-sm" placeholder="Enter the title" autofocus required />
      </div>

      <div class="space-y-2">
        <Label :for="id.author">Author<span class="text-destructive">*</span></Label>
        <Input :id="id.author" v-model="draft.author" class="text-sm" placeholder="Enter the author" />
      </div>

      <Separator />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="space-y-2">
          <Label :for="id.category">Category</Label>
          <!-- The reason why vue-ignore directives are here, it that Reka UI doesn't support 
          any types (but not values) for nullableValue other than 'string', but native elements inside 
          Reka UI components work with 'null' perfectly. Same staff goes with 'boolean' on Reka UI Select. 
          They turned it it off because of VueJS boolean casting. Considering that limitation you can use it
          -->
          <!-- @vue-ignore -->
          <Select v-model="draft.category" :value="draft.category" :nullable-value="null">
            <SelectTrigger :id="id.category" class="w-full">
              <SelectValue :placeholder="draft.category ? capitalizeProperty(draft.category) : 'Not chosen'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="null">Not chosen</SelectItem>
              <SelectItem v-for="category of categories" :key="category" :value="category">
                {{ capitalizeProperty(category) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label :for="id.language">Language</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.language" :value="draft.language" :nullable-value="null">
            <SelectTrigger :id="id.language" class="w-full">
              <SelectValue :placeholder="draft.language ? languageMap[draft.language] : 'Not chosen'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="null">Not chosen</SelectItem>
              <SelectItem v-for="l in languages" :key="l" :value="l">
                {{ languageMap[l] }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label :for="id.rating">Rating</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.rating" :value="draft.rating" :nullable-value="null">
            <SelectTrigger :id="id.rating" class="w-full">
              <SelectValue placeholder="Not chosen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="null">Not chosen</SelectItem>
              <SelectItem v-for="{ rating, score, label } of ratingOptions" :key="rating" :value="rating">
                {{ score }} — {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2 w-full flex flex-col">
          <Label :for="id.status" class="text-left">Status</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.hasFinished" :nullable-value="null">
            <SelectTrigger :id="id.status" class="w-full">
              <SelectValue :placeholder="hasFinishedPlaceholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="null">Not chosen</SelectItem>
              <!-- @vue-ignore -->
              <SelectItem :value="true">Finished</SelectItem>
              <!-- @vue-ignore -->
              <SelectItem :value="false">Not finished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label :for="id.startDate">Start date</Label>
          <DatePicker :id="id.startDate" v-model:date="draft.startDate" class="w-full" />
        </div>

        <div class="space-y-2">
          <Label :for="id.endDate">End date</Label>
          <DatePicker :id="id.endDate" v-model:date="draft.endDate" :has-date-error />
        </div>
      </div>

      <p v-if="hasDateError" class="text-left text-sm text-destructive">The end date cannot be before the start date</p>

      <div class="space-y-2">
        <Label :for="id.description">Description</Label>
        <!-- @vue-ignore -->
        <Textarea
          :id="id.description"
          v-model="draft.description"
          class="text-sm"
          placeholder="Impressions, quotes, thoughts..."
          rows="6"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import DatePicker from '@/components/book/editing/DatePicker.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { capitalizeProperty, languageMap, ratingOptions } from '@/utils'
import { newBook, categories, languages, type NewBook } from '@/schemas/book'
import { useIds } from '@/composables/useIds'
import { computed, watch } from 'vue'

const draft = defineModel<NewBook>('draft', { required: true })
const hasErrors = defineModel<boolean>('hasErrors', { required: true })
const hasDateError = computed(() =>
  Boolean(
    draft.value.startDate && draft.value.endDate && new Date(draft.value.endDate) < new Date(draft.value.startDate),
  ),
)

const id = useIds('title', 'author', 'category', 'language', 'rating', 'status', 'startDate', 'endDate', 'description')
const hasFinishedPlaceholder = computed(() => {
  switch (draft.value.hasFinished) {
    case true:
      return 'Finished'
    case false:
      return 'Not finished'
    default:
      return 'Not chosen'
  }
})

watch(
  draft,
  () => {
    const { success } = newBook.safeParse(draft.value)
    hasErrors.value = !(success && !hasDateError.value)
  },
  { deep: true },
)
</script>
