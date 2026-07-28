import type { Book } from '@/schemas/book'

function formatDate(iso?: string | null | undefined): string {
  if (!iso) {
    return '-'
  }
  return new Date(iso).toLocaleDateString('en-EN', { day: '2-digit', month: 'long', year: 'numeric' })
}

function dropTime(datetime: string | null | undefined) {
  if (!datetime) {
    return datetime
  }
  const d = new Date(datetime)
  const year = String(d.getUTCFullYear()).padStart(4, '0')
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

export { formatDate, dropTime, getYears }
