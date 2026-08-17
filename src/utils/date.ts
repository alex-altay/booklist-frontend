import type { Book } from '@/schemas/book'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function formatDate(iso?: string | null | undefined): string {
  if (!iso) {
    return '-'
  }
  return new Date(iso).toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getYears(books: Book[]): number[] {
  const unique = new Set<number>()
  for (const { endDate } of books) {
    if (endDate) {
      unique.add(new Date(endDate).getFullYear())
    }
  }
  return [...unique].sort((a, b) => b - a)
}

function getDaysDuration(book: Book): number {
  if (!book.endDate || !book.startDate) {
    return 0
  }
  const duration = new Date(book.endDate).getTime() - new Date(book.startDate).getTime()
  return Math.round(duration / MS_PER_DAY)
}

export { formatDate, getYears, getDaysDuration, MS_PER_DAY }
