<template>
  <Card>
    <CardHeader class="text-left">
      <CardTitle>Rating Distribution</CardTitle>
      <CardDescription v-if="hasRatings">See how many books received each rating</CardDescription>
      <CardDescription v-else>Add some ratings to your books to see the distribution</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig">
        <VisXYContainer :data="chartData" :margin="{ left: -24 }" :y-domain="[0, undefined]">
          <VisGroupedBar
            :x="(d: ChartData) => d.rating"
            :y="(d: ChartData) => d.books"
            :color="chartConfig.rating.color"
            :rounded-corners="6"
          />
          <VisAxis
            type="x"
            :x="(d: ChartData) => d.rating"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="10"
            :tick-values="chartData.map((d) => d.rating)"
          />
          <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
          <ChartTooltip />
          <ChartCrosshair
            :template="
              componentToString(chartConfig, ChartTooltipContent, {
                hideIndicator: true,
                labelKey: 'books',
                labelFormatter(d) {
                  if (typeof d != 'number') {
                    return ''
                  }
                  const ratingName = ratings[d - 1]
                  return ratingMap[ratingName][1] || ''
                },
              })
            "
            :color="CHART_COLOR"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import { ratingMap } from '@/utils'
import { ratings } from '@/schemas/book'
import type { ChartConfig } from '@/components/ui/chart'
import type { Book } from '@/schemas/book'

const { books } = defineProps<{ books: Book[] }>()

type ChartData = { rating: number; books: number }
const chartData: ChartData[] = []
const hasRatings = books.some((b) => b.rating)
const CHART_COLOR = 'oklch(37.1% 0 none)' // tailwind neutral-700

for (let i = 1; i <= 10; i++) {
  chartData.push({ rating: i, books: 0 })
}
for (const book of books) {
  if (book.rating!) {
    const index = ratingMap[book.rating][0]
    chartData[index]['books']++
  }
}

const chartConfig: ChartConfig = {
  books: {
    label: 'Books Total',
  },
  rating: {
    label: 'Rating',
    color: CHART_COLOR,
  },
}
</script>
