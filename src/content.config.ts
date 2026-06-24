import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    tagline: z.string(),
    category: z.enum(['juice', 'mocktail', 'soda', 'energy', 'water']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    badge: z.enum(['new', 'limited', 'bestseller', 'classic']).optional(),
    flavorColor: z.string(),
    flavorColorLight: z.string(),
    image: z.string(),
    gallery: z.array(z.string()).optional(),
    nutrition: z.object({
      calories: z.number(),
      sugar: z.string(),
      size: z.string(),
      ingredients: z.array(z.string()),
    }),
    tasteNotes: z.array(z.string()),
  }),
});

export const collections = { products };