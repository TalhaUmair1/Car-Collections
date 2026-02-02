import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    cars: defineCollection({
      type: 'page',
      source: 'cars/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
        category: z.string(),
        model: z.string().optional(),
        image: z.string().optional(),
        specs: z.array(z.string()).optional()
      })
    })
  }
})
