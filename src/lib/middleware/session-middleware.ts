import { AUTH_COOKIE_NAME } from '@/features/auth/constance';
import { User } from '@prisma/client';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { getTranslations } from 'next-intl/server';

export type AdditionalContext = {
  Variables: {
    'current-user': Omit<User, 'password'>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const t = await getTranslations('API');
  const cookie = getCookie(c, AUTH_COOKIE_NAME);
  if (!cookie) return c.json({ success: false, message: t('not-auth') }, 401);
  const user = JSON.parse(Buffer.from(cookie, 'base64').toString());
  c.set('current-user', user);
  await next();
});

