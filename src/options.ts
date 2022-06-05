import { z } from 'zod';

export type Options = z.infer<typeof ruleOptionsSchema>;

export const ruleOptionsSchema = z.object({
  allow: z
    .object({
      features: z.array(z.string()).default(() => []),
      flagged: z.boolean().default(false),
      partialImplementation: z.boolean().default(false),
      prefix: z.boolean().default(true),
    })
    .default(() => ({})),
  browserslist: z.union([z.string(), z.array(z.string())]).optional(),
});
