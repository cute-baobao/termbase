import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    JWT_SECRET: z.string().min(6, '最少六个字符'),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1, 'NEXT_PUBLIC_BASE_URL is required'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
});

