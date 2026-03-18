import { createError } from 'h3'

export function resolveMessageIdFromQuery(query: Record<string, unknown>) {
  const rawMessageId = Array.isArray(query.messageID) ? query.messageID[0] : query.messageID
  const messageID = Number(rawMessageId)

  if (rawMessageId === undefined || rawMessageId === null || rawMessageId === '') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'messageID query parameter is required',
    })
  }

  if (!Number.isInteger(messageID) || messageID < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'messageID must be a positive integer',
    })
  }

  return messageID
}
