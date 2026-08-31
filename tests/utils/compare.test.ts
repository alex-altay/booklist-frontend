import { describe, expect, it } from 'vitest'
import { newBook, type NewBook } from '@/schemas/book'
import { areBooksEqual } from '@/utils/compare'
import { makeBook } from '../fixtures/book'

function makeNewBook(overrides: Partial<NewBook> = {}): NewBook {
  return { ...newBook.parse(makeBook()), ...overrides }
}

describe('areBooksEqual', () => {
  it('treats two identical books as equal', () => {
    expect(areBooksEqual(makeNewBook(), makeNewBook())).toBe(true)
  })

  it('treats the same object as equal to itself', () => {
    const book = makeNewBook()
    expect(areBooksEqual(book, book)).toBe(true)
  })

  it('detects a changed title', () => {
    expect(areBooksEqual(makeNewBook(), makeNewBook({ title: 'Another title' }))).toBe(false)
  })

  it('ignores keys outside the newBook schema', () => {
    const a = { ...makeNewBook(), id: 1, userId: 667 } as NewBook
    const b = { ...makeNewBook(), id: 999, userId: 42 } as NewBook
    expect(areBooksEqual(a, b)).toBe(true)
  })

  it('compares null fields as equal', () => {
    const a = makeNewBook({ description: null, rating: null, category: null })
    const b = makeNewBook({ description: null, rating: null, category: null })
    expect(areBooksEqual(a, b)).toBe(true)
  })

  it('separates null from an empty string', () => {
    expect(areBooksEqual(makeNewBook({ description: null }), makeNewBook({ description: '' }))).toBe(false)
  })
})
