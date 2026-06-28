import { z } from "zod"

export const PostStoreReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1),
})

export type PostStoreReviewType = z.infer<typeof PostStoreReviewSchema>
