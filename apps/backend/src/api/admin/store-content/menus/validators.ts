import { z } from "zod"

export const PostAdminMenuItemSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
  location: z.enum(["header", "footer"]),
  rank: z.number().optional().default(0),
  new_tab: z.boolean().optional().default(false),
})
export type PostAdminMenuItemType = z.infer<typeof PostAdminMenuItemSchema>

export const PostAdminUpdateMenuItemSchema = z.object({
  label: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
  location: z.enum(["header", "footer"]).optional(),
  rank: z.number().optional(),
  new_tab: z.boolean().optional(),
})
export type PostAdminUpdateMenuItemType = z.infer<
  typeof PostAdminUpdateMenuItemSchema
>
