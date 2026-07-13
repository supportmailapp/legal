import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    effectiveDate: z.coerce.date().optional(),
    order: z.coerce.number().optional(),
  }),
});

export const collections = { legal };
