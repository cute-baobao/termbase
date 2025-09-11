import { Lang } from '@prisma/client';
import z from 'zod';

export const createTermbaseSchema = z.object({
  name: z.string().min(3).max(50),
  sourceLang: z.enum(Lang),
  targetLang: z.enum(Lang),
  ownerId: z.string().optional(),
});

export type CreateTermbaseSchema = z.infer<typeof createTermbaseSchema>;
