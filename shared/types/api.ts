import { z } from 'zod'

export const MessageRecordSchema = z.object({
  id: z.number().int().positive(),
  text: z.string(),
  createdAt: z.number().int().nonnegative(),
})

export const CreateMessageBodySchema = z.object({
  text: z.string(),
})

export const UpdateMessageBodySchema = z.object({
  messageID: z.number().int().positive(),
  text: z.string(),
})

export const RedirectMapSchema = z.record(z.string(), z.string())

export const RedirectPairSchema = z.object({
  from: z.string(),
  to: z.string(),
})

export const BlobImageSchema = z.object({
  pathname: z.string(),
  size: z.number().nonnegative(),
})

export type MessageRecord = z.infer<typeof MessageRecordSchema>
export type CreateMessageBody = z.infer<typeof CreateMessageBodySchema>
export type UpdateMessageBody = z.infer<typeof UpdateMessageBodySchema>
export type RedirectMap = z.infer<typeof RedirectMapSchema>
export type RedirectPair = z.infer<typeof RedirectPairSchema>
export type BlobImage = z.infer<typeof BlobImageSchema>
