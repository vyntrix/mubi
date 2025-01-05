import { moods } from '$lib/types'
import { z } from 'zod'

export const moodEntrySchema = z.object({
  mood: z.string().refine(value => moods.find(mood => mood.value === value) !== undefined),
})

export const entrySchema = moodEntrySchema.extend({
  body: z.string().min(3).max(1000),
})

export type EntrySchema = z.infer<typeof entrySchema>
