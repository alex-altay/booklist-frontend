<template>
  <form @submit.prevent>
    <div class="space-y-6 2xl:space-y-12">
      <div class="space-y-2">
        <Label :for="id.title">Title<span class="text-destructive">*</span></Label>
        <Input
          :id="id.title"
          ref="focused"
          v-model="draft.title"
          class="text-sm"
          placeholder="Enter the title"
          autofocus
          required
        />
      </div>

      <div class="space-y-2">
        <Label :for="id.author">Author<span class="text-destructive">*</span></Label>
        <Input :id="id.author" v-model="draft.author" class="text-sm" placeholder="Enter the author" />
      </div>

      <Separator />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="space-y-2">
          <Label :for="id.category">Category</Label>
          <FormSelect :id="id.category" v-model="draft.category" :options="categoryOptions" />
        </div>

        <div class="space-y-2">
          <Label class="space-y-2" :for="id.language">Language</Label>
          <FormSelect :id="id.language" v-model="draft.language" :options="languageOptions" />
        </div>

        <div class="space-y-2">
          <Label :for="id.rating">Rating</Label>
          <FormSelect :id="id.rating" v-model="draft.rating" :options="ratingOptions" />
        </div>

        <div class="space-y-2 w-full flex flex-col">
          <Label :for="id.status" class="text-left">Status</Label>
          <FormSelect :id="id.status" v-model="draft.status" :options="statusOptions" />
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
        <textarea
          :id="id.description"
          v-model="draft.description"
          placeholder="Impressions, quotes, thoughts..."
          rows="6"
          class="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 text-sm"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import DatePicker from '@/components/book/editing/DatePicker.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormSelect } from '@/components/ui/form-select'
import { Separator } from '@/components/ui/separator'
import { getSelectOptions } from '@/utils'
import { useIds } from '@/composables/useIds'
import { type NewBook } from '@/schemas/book'
import { useTemplateRef } from 'vue'
import { useFocus } from '@vueuse/core'

defineProps<{ hasDateError: boolean }>()
const draft = defineModel<NewBook>('draft', { required: true })
const id = useIds('title', 'author', 'category', 'language', 'rating', 'status', 'startDate', 'endDate', 'description')
const { ratingOptions, categoryOptions, languageOptions, statusOptions } = getSelectOptions()
const focused = useTemplateRef<HTMLInputElement>('focused')
useFocus(focused, { initialValue: true })
</script>
