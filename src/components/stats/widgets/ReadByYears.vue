<template>
  <Card>
    <CardHeader class="text-left">
      <CardTitle class="text-xs text-muted-foreground uppercase tracking-wider">Read By Years By Language</CardTitle>
      <CardDescription class="text-xs">
        {{
          hasData
            ? 'See how many books you read every year'
            : 'Add an end date and language to your books to see the distribution'
        }}
      </CardDescription>
    </CardHeader>
    <CardContent>
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
            :tick-values="chartData.map((d) => d.year)"
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter(d) {
                  return `Total books read in ${d}`
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
const CHART_COLOR_DE = 'oklch(26.9% 0 none)' // tailwind neutral-800
const CHART_COLOR_EN = 'oklch(37.1% 0 none)' // tailwind neutral-700
const CHART_COLOR_RU = 'oklch(43.9% 0 none)' // tailwind neutral-600

type ChartData = { year: string; DE: number; EN: number; RU: number }
const chartData: ChartData[] = []
const years = getYears(withDateAndLanguage)
const yearDictionary: Record<(typeof years)[number], { DE: number; EN: number; RU: number }> = {}
for (const year of years) {
  yearDictionary[year] = { DE: 0, EN: 0, RU: 0 }
}
for (const book of withDateAndLanguage) {
  const year = new Date(book.endDate!).getFullYear()
  yearDictionary[year][book.language!]++
}
for (const [k, v] of Object.entries(yearDictionary)) {
  chartData.push({ year: k, ...v })
}
if (chartData.length != 0 && chartData.length < BAR_NUMBER) {
  const padNumber = BAR_NUMBER - chartData.length
  const minYear = years.sort((a, b) => a - b)[0]
  for (let i = minYear - 1; i >= minYear - padNumber; i--) {
    chartData.unshift({ year: `${i}`, DE: 0, EN: 0, RU: 0 })
  }
}

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
