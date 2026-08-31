import { describe, expect, it } from 'vitest'
import { capitalizeProperty } from '@/utils/capitalize'

describe('capitalizeProperty', () => {
  it('capitalizes a single-word enum value', () => {
    expect(capitalizeProperty('FICTION')).toBe('Fiction')
  })

  it('replaces underscores with spaces', () => {
    expect(capitalizeProperty('NON_FICTION')).toBe('Non fiction')
    expect(capitalizeProperty('BELOW_AVERAGE')).toBe('Below average')
  })

  it('only capitalizes the first word', () => {
    expect(capitalizeProperty('WORTH_READING')).toBe('Worth reading')
  })

  it('handles multiple underscores', () => {
    expect(capitalizeProperty('A_B_C')).toBe('A b c')
  })

  it('leaves an already formatted string alone', () => {
    expect(capitalizeProperty('Fiction')).toBe('Fiction')
  })

  it('returns an empty string unchanged', () => {
    expect(capitalizeProperty('')).toBe('')
  })

  it('handles a single character', () => {
    expect(capitalizeProperty('a')).toBe('A')
  })
})
