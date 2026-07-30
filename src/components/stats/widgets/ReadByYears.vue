<template>
  <Card class="py-4 sm:py-0">
    <CardHeader class="flex flex-col items-stretch border-b p-0! sm:flex-row">
      <div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-left">
        <CardTitle class="text-xs text-muted-foreground uppercase tracking-wider">Read By Years By Language</CardTitle>
        <CardDescription class="text-xs">
          {{
            hasData
              ? 'See how many books you read every year'
              : 'Add an end date and language to your books to see the distribution'
          }}
        </CardDescription>
      </div>
      <div class="flex">
        <div
          class="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
        >
          <span class="text-muted-foreground text-xs"> Read in {{ currentYear }} </span>
          <span class="text-lg text-right leading-none font-bold sm:text-3xl">
            {{ totalReadInCurrent }}
          </span>
        </div>
      </div>
    </CardHeader>
    <CardContent class="pb-6">
      <ChartContainer :config="chartConfig">
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisStackedBar
            :x="(d: ChartData) => d.year"
            :y="[(d: ChartData) => d.DE, (d: ChartData) => d.EN, (d: ChartData) => d.RU]"
            :color="[chartConfig.DE.color, chartConfig.EN.color, chartConfig.RU.color]"
            :rounded-corners="6"
            :bar-padding="0.1"
          />
          <VisAxis
            type="x"
            :x="(d: ChartData) => d.year"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="BAR_NUMBER"
            :min-max-ticks-only-when-width-is-less="TICKS_HIDE_WIDTH"
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" :label-font-size="8" />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter(d) {
                  return `In ${d} you've read ${totalByYears[+d] || 0} books`
                },
              })
            "
            :color="[chartConfig.DE.color, chartConfig.EN.color, chartConfig.RU.color]"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import { getYears } from '@/utils/date'
import type { ChartConfig } from '@/components/ui/chart'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()
const withDateAndLanguage = books.filter((b) => b.language && b.endDate)
const hasData = withDateAndLanguage.length > 0

const BAR_NUMBER = 10
const TICKS_HIDE_WIDTH = 400
const CHART_COLOR_DE = 'oklch(26.9% 0 none)' // tailwind neutral-800
const CHART_COLOR_EN = 'oklch(37.1% 0 none)' // tailwind neutral-700
const CHART_COLOR_RU = 'oklch(43.9% 0 none)' // tailwind neutral-600

type ChartData = { year: number; DE: number; EN: number; RU: number }
const chartData: ChartData[] = []
const years = getYears(withDateAndLanguage)
const yearDictionary: Record<(typeof years)[number], { DE: number; EN: number; RU: number }> = {}
const totalByYears: Record<(typeof years)[number], number> = {}
for (const year of years) {
  yearDictionary[year] = { DE: 0, EN: 0, RU: 0 }
  totalByYears[year] = 0
}
for (const book of withDateAndLanguage) {
  const year = new Date(book.endDate!).getFullYear()
  yearDictionary[year][book.language!]++
  totalByYears[year]++
}
for (const [k, v] of Object.entries(yearDictionary)) {
  chartData.push({ year: +k, ...v })
}
if (chartData.length != 0 && chartData.length < BAR_NUMBER) {
  const padNumber = BAR_NUMBER - chartData.length
  const minYear = years.sort((a, b) => a - b)[0]
  for (let i = minYear - 1; i >= minYear - padNumber; i--) {
    chartData.unshift({ year: i, DE: 0, EN: 0, RU: 0 })
  }
}

const currentYear = new Date().getFullYear()
const totalReadInCurrent = withDateAndLanguage.reduce(
  (acc, b) => (acc + new Date(b.endDate!).getFullYear() == currentYear ? 1 : 0),
  0,
)

const chartConfig: ChartConfig = {
  books: {
    label: 'Books Total',
  },
  DE: {
    label: 'Deutsch',
    color: CHART_COLOR_DE,
  },
  EN: {
    label: 'English',
    color: CHART_COLOR_EN,
  },
  RU: {
    label: 'Russian',
    color: CHART_COLOR_RU,
  },
}
</script>
