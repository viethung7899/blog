import { z, defineCollection } from "astro:content"

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    thumbnail: z.string(),
    description: z.string(),
    interactive: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = {
  posts: postCollection,
}