import { db, schema } from 'hub:db'
export default eventHandler(async (event) => {
  const { text } = await readValidatedBody(event, CreateMessageBodySchema.parse)

  await db.insert(schema.messages).values({
    text,
    createdAt: Date.now(),
  })

  return {}
})
