import { type Book, book as schema } from '@/schemas/book'

export function booksToCSV(books: Book[]) {
  const divider = '\n'
  const headers = Object.keys(schema.shape)
  const rows: string[] = books.map((book) => createRow(headers, book))
  return `${headers.join(',')}${divider}${rows.join(divider)}`
}

function createRow(headers: string[], book: Book): string {
  let row: string[] = []
  for (const header of headers) {
    row.push(JSON.stringify(book[header as keyof Book]))
  }
  return row.join(',')
}
