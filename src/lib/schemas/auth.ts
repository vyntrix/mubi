import { z } from 'zod'

export const magicLinkSchema = z.object({
  email: z.string().email(),
})

export type MagicLink = z.infer<typeof magicLinkSchema>
