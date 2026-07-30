<template>
  <Card class="py-4 sm:py-0">
    <CardHeader class="flex flex-col items-stretch border-b p-0! sm:flex-row">
      <div class="flex">
        <div
          class="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-r sm:border-t-0 sm:border-r sm:px-8 sm:py-6"
        >
          <span class="text-muted-foreground text-xs"> Average Rating </span>
          <span class="text-left leading-none">
            <span class="text-lg text-left leading-none font-bold sm:text-3xl">
              {{ averageRating }}
            </span>
            <span class="text-xs text-muted-foreground"> of 10 </span>
          </span>
        </div>
      </div>
      <div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6 text-left">
        <CardTitle class="text-xs text-muted-foreground uppercase tracking-wider">Rating Distribution</CardTitle>
        <CardDescription class="text-xs">
          {{
            hasRatings
              ? 'See how many books received each rating'
              : 'Add some ratings to your books to see the distribution'
          }}
        </CardDescription>
      </div>
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

const [totalRating, totalBooks] = books.reduce(
  (acc: [number, number], el: Book): [number, number] =>
    el.rating ? [acc[0] + ratingMap[el.rating][0], acc[1] + 1] : acc,
  [0, 0],
)
const averageRating = Math.round((totalRating / totalBooks) * 10) / 10

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
