<template>
  <form @submit.prevent>
    <div class="space-y-6">
      <div class="space-y-2">
        <Label for="title">Title<span className="text-destructive">*</span></Label>
        <Input id="title" v-model="draft.title" class="text-sm" placeholder="Enter the title" autofocus required />
      </div>

      <div class="space-y-2">
        <Label for="author">Author<span className="text-destructive">*</span></Label>
        <Input id="author" v-model="draft.author" class="text-sm" placeholder="Enter the author" />
      </div>

      <Separator />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="space-y-2">
          <Label>Category</Label>
          <!-- The reason why vue-ignore directives are here, it that Reka UI doesn't support 
          any types (but not values) for nullableValue other than 'string', but native elements inside 
          Reka UI components work with 'null' perfectly. Same staff goes with 'boolean' on Reka UI Select. 
          They turned it it off because of VueJS boolean casting. Considering that limitation you can use it
          -->
          <!-- @vue-ignore -->
          <Select v-model="draft.category" :value="draft.category" :nullable-value="null">
            <SelectTrigger class="w-full">
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
          <Label>Language</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.language" :value="draft.language" :nullable-value="null">
            <SelectTrigger class="w-full">
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
          <Label>Rating</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.rating" :value="draft.rating" :nullable-value="null">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Not chosen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="null">Not chosen</SelectItem>
              <SelectItem v-for="(rating, index) of ratings" :key="rating" :value="rating">
                {{ index + 1 }} — {{ capitalizeProperty(rating) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2 w-full flex flex-col">
          <Label class="text-left">Status</Label>
          <!-- @vue-ignore -->
          <Select v-model="draft.hasFinished" :nullable-value="null">
            <SelectTrigger class="w-full">
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
          <Label for="startDate">Start date</Label>
          <!-- @vue-ignore -->
          <Input
            id="startDate"
            v-model="draft.startDate"
            type="date"
            class="text-sm"
            :class="{ 'text-muted-foreground': !draft.startDate }"
          />
        </div>

        <div class="space-y-2">
          <Label for="endDate">End Date</Label>
          <!-- @vue-ignore -->
          <Input
            id="endDate"
            v-model="draft.endDate"
            type="date"
            class="text-sm"
            :class="{
              'border-destructive': hasDateError,
              'focus-visible:ring-destructive': hasDateError,
              'text-muted-foreground': !draft.endDate,
            }"
          />
        </div>
      </div>

      <p v-if="hasDateError" class="text-left text-sm text-destructive">The end date cannot be before the start date</p>

      <div class="space-y-2">
        <Label for="description">Description</Label>
        <!-- @vue-ignore -->
        <Textarea
          id="description"
          v-model="draft.description"
          class="text-sm"
          placeholder="Impressions, quotes, thoughs..."
          rows="6"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { capitalizeProperty } from '@/utils/capitalize'
import { languageMap } from '@/utils/maps'
import { newBook, categories, languages, ratings, type NewBook } from '@/schemas/book'
import { computed, watch } from 'vue'

const draft = defineModel<NewBook>('draft', { required: true })
const hasErrors = defineModel<boolean>('hasErrors', { required: true })
const hasDateError = computed(
  () => draft.value.startDate && draft.value.endDate && new Date(draft.value.endDate) < new Date(draft.value.startDate),
)

const hasFinishedPlaceholder = computed(() => {
  switch (draft.value.hasFinished) {
    case null:
      return 'Not chosen'
    case true:
      return 'Finished'
    case false:
    default:
      return 'Not finished'
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
