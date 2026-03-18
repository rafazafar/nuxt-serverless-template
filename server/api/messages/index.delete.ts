import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

import { resolveMessageIdFromQuery } from '../../utils/message-id'

export default eventHandler(async (event) => {
  const messageID = resolveMessageIdFromQuery(getQuery(event))

  await db.delete(schema.messages)
    .where(eq(schema.messages.id, messageID))

  return { success: true }
})
