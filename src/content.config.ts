import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A "find" is one write-up of a place. One Markdown file per find in src/content/finds/.
const finds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/finds' }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    area: z.string(), // e.g. "Leeds", "Harrogate", "North Yorkshire"
    type: z.enum(['restaurant', 'cafe', 'bar', 'hotel', 'day-out', 'event', 'shop']),
    date: z.coerce.date(),
    summary: z.string().max(220),
    cover: z.string().optional(), // path under /public, e.g. /images/finds/xyz.jpg
    coverAlt: z.string().optional(),
    partnership: z.enum(['none', 'gifted', 'paid']).default('none'),
    reel: z.string().url().optional(), // the matching Instagram reel, if any
    example: z.boolean().default(false), // true = placeholder content, shown with a banner
    draft: z.boolean().default(false),
  }),
});

export const collections = { finds };
