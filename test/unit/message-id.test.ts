import { describe, expect, it } from 'vitest'

import { resolveMessageIdFromQuery } from '../../server/utils/message-id'

describe('resolveMessageIdFromQuery', () => {
  it('returns a numeric message ID from query params', () => {
    expect(resolveMessageIdFromQuery({ messageID: '42' })).toBe(42)
  })

  it('throws when message ID is missing', () => {
    expect(() => resolveMessageIdFromQuery({})).toThrow('messageID query parameter is required')
  })

  it('throws when message ID is not a positive integer', () => {
    expect(() => resolveMessageIdFromQuery({ messageID: 'abc' })).toThrow('messageID must be a positive integer')
    expect(() => resolveMessageIdFromQuery({ messageID: '0' })).toThrow('messageID must be a positive integer')
  })
})
