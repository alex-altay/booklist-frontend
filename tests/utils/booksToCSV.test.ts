import { describe, expect, it } from 'vitest'
import { booksToCSV } from '@/utils/booksToCSV'
import { makeBook } from '../fixtures/book'

const BOM = '﻿'
const HEADER = 'Title,Author,Language,Category,Rating,Start date,End date,Status,Description'

function rows(csv: string): string[] {
  return csv.slice(BOM.length).split('\r\n')
}

describe('booksToCSV', () => {
  it('starts with a BOM so Excel detects UTF-8', () => {
    expect(booksToCSV([]).startsWith(BOM)).toBe(true)
  })

  it('always writes the header', () => {
    expect(rows(booksToCSV([]))).toEqual([HEADER])
  })

  it('separates rows with CRLF', () => {
    const csv = booksToCSV([makeBook({ id: 1 }), makeBook({ id: 2 })])
    expect(csv.slice(BOM.length).split('\r\n')).toHaveLength(3)
    expect(csv).not.toMatch(/[^\r]\n/)
  })

  it('writes one row per book in the given order', () => {
    const csv = booksToCSV([makeBook({ title: 'First' }), makeBook({ title: 'Second' })])
    expect(rows(csv)[1].startsWith('First,')).toBe(true)
    expect(rows(csv)[2].startsWith('Second,')).toBe(true)
  })

  it('renders enum values with human-readable labels', () => {
    const csv = booksToCSV([
      makeBook({
        title: 'Solaris',
        author: 'Stanislaw Lem',
        language: 'RU',
        category: 'NON_FICTION',
        rating: 'GOOD',
        startDate: '2019-08-30',
        endDate: '2019-09-01',
        status: 'FINISHED',
        description: 'good one',
      }),
    ])
    expect(rows(csv)[1]).toBe('Solaris,Stanislaw Lem,Russian,Non fiction,8,2019-08-30,2019-09-01,Finished,good one')
  })

  it('writes a rating as a number', () => {
    expect(rows(booksToCSV([makeBook({ rating: 'BEST' })]))[1].split(',')[4]).toBe('10')
  })

  it('leaves nullable columns empty', () => {
    const csv = booksToCSV([
      makeBook({ language: null, category: null, rating: null, startDate: null, endDate: null, description: null }),
    ])
    expect(rows(csv)[1]).toBe('Solaris,Stanislaw Lem,,,,,,Finished,')
  })

  it('reports a book with null status as In Process', () => {
    expect(rows(booksToCSV([makeBook({ status: null })]))[1].split(',')[7]).toBe('In Process')
  })

  it('quotes a value containing a comma', () => {
    const csv = booksToCSV([makeBook({ author: 'Strugatsky, Arkady' })])
    expect(rows(csv)[1]).toContain('"Strugatsky, Arkady"')
  })

  it('quotes a value containing a newline', () => {
    const csv = booksToCSV([makeBook({ description: 'line one\nline two' })])
    expect(csv).toContain('"line one\nline two"')
  })

  it('quotes a value containing a new line', () => {
    const csv = booksToCSV([makeBook({ description: 'line one\r\nline two' })])
    expect(csv).toContain('"line one\r\nline two"')
  })

  it('leaves a plain value unquoted', () => {
    expect(rows(booksToCSV([makeBook({ title: 'Solaris' })]))[1].startsWith('Solaris,')).toBe(true)
  })
})
