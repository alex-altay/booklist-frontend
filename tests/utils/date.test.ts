import { describe, expect, it } from 'vitest'
import { formatDate, getDaysDuration, getYears } from '@/utils/date'
import { makeBook } from '../fixtures/book'

describe('formatDate', () => {
  it('formats an ISO date as en-US long form', () => {
    expect(formatDate('2018-03-28')).toBe('March 28, 2018')
  })

  it('accepts a full ISO timestamp', () => {
    expect(formatDate('2021-09-25T13:08:15Z')).toBe('September 25, 2021')
  })

  it('returns - when called with no argument', () => {
    expect(formatDate()).toBe('-')
  })

  it('renders a broken string as Invalid Date', () => {
    expect(() => formatDate('not a date')).not.toThrow()
    expect(formatDate('not a date')).toBe('Invalid Date')
  })
})

describe('getYears', () => {
  it('returns the years books were finished in, newest first', () => {
    const books = [
      makeBook({ id: 1, endDate: '2019-09-01' }),
      makeBook({ id: 2, endDate: '2021-10-06' }),
      makeBook({ id: 3, endDate: '2020-06-25' }),
    ]
    expect(getYears(books)).toEqual([2021, 2020, 2019])
  })

  it('ignores books with no end date', () => {
    const books = [makeBook({ id: 1, endDate: null }), makeBook({ id: 2, endDate: '2019-09-01' })]
    expect(getYears(books)).toEqual([2019])
  })

  it('returns an empty array when there are no books', () => {
    expect(getYears([])).toEqual([])
  })

  it('returns an empty array when there are no endDate', () => {
    expect(getYears([makeBook({ endDate: null })])).toEqual([])
  })

  it('uses the end date, not the start date', () => {
    expect(getYears([makeBook({ startDate: '2018-12-31', endDate: '2019-01-01' })])).toEqual([2019])
  })
})

describe('getDaysDuration', () => {
  it('counts whole days between start and end', () => {
    expect(getDaysDuration(makeBook({ startDate: '2018-02-01', endDate: '2018-03-28' }))).toBe(55)
  })

  it('returns 0 when a book starts and ends on the same day', () => {
    expect(getDaysDuration(makeBook({ startDate: '2020-06-18', endDate: '2020-06-18' }))).toBe(0)
  })

  it('counts a single day', () => {
    expect(getDaysDuration(makeBook({ startDate: '2020-06-18', endDate: '2020-06-19' }))).toBe(1)
  })
})
