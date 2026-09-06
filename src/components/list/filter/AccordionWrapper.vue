<template>
  <Accordion
    :key="String(shouldUseAccordion)"
    type="single"
    as="aside"
    :default-value="shouldUseAccordion ? undefined : id"
    class="lg:col-span-1 py-0"
    :collapsible="shouldUseAccordion"
  >
    <AccordionItem :value="id">
      <div class="space-y-6 bg-card px-6 pb-0 rounded-xl border">
        <AccordionTrigger class="pb-0 no-underline!">
          <slot name="header" />
          <template #icon>
            <p class="hidden" />
          </template>
        </AccordionTrigger>
        <AccordionContent>
          <slot name="body" />
        </AccordionContent>
      </div>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { useId } from 'vue'
import { useFiltrationStore } from '@/stores/filtration'
import { storeToRefs } from 'pinia'

const id = useId()
const { shouldUseAccordion } = storeToRefs(useFiltrationStore())
</script>

<style>
@media (prefers-reduced-motion: reduce) {
  [data-slot='accordion-content'] {
    animation: none !important;
  }
}
</style>
