import { type Book } from '@/schemas/book'
import { capitalizeProperty } from '@/utils/capitalize'
import { languageMap, ratingMap } from '@/utils/maps'

const BOM = '\uFEFF'
const ROW_DIVIDER = '\r\n'

type Cell = string | number | boolean | null | undefined
type Column = { header: string; value: (book: Book) => Cell }

const COLUMNS: Column[] = [
  { header: 'Title', value: (b) => b.title },
  { header: 'Author', value: (b) => b.author },
  { header: 'Language', value: (b) => (b.language ? languageMap[b.language] : null) },
  { header: 'Category', value: (b) => (b.category ? capitalizeProperty(b.category) : null) },
  { header: 'Rating', value: (b) => (b.rating ? ratingMap[b.rating][0] : null) },
  { header: 'Start date', value: (b) => b.startDate },
  { header: 'End date', value: (b) => b.endDate },
  { header: 'Finished', value: (b) => (b.hasFinished == null ? null : b.hasFinished ? 'Yes' : 'No') },
  { header: 'Description', value: (b) => b.description },
]

function escapeCell(value: Cell): string {
  if (value == null) {
    return ''
  }
  const text = String(value)
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function booksToCSV(books: Book[]): string {
  const head = COLUMNS.map((column) => escapeCell(column.header)).join(',')
  const rows = books.map((book) => COLUMNS.map((column) => escapeCell(column.value(book))).join(','))
  return BOM + [head, ...rows].join(ROW_DIVIDER)
}
