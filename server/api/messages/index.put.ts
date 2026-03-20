import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { messageID, text } = await readValidatedBody(event, UpdateMessageBodySchema.parse)

  await db.update(schema.messages)
    .set({ text })
    .where(eq(schema.messages.id, messageID))

  return {}
})
