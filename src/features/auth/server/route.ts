import { AdditionalContext, sessionMiddleware } from '@/lib/middleware/session-middleware';
import { signJWT } from '@/lib/utils/jwt';
import { AuthRepository } from '@/server/repositories/auth-repository';
import { AuthService } from '@/server/service/auth-service';
import { zValidator } from '@hono/zod-validator';
import { Context, Hono, Next } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { getTranslations } from 'next-intl/server';
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from '../constance';
import { signInSchema, SignUpSchema, signUpSchema } from '../schemas';

const alreadyExists = async (c: Context, next: Next) => {
  const t = await getTranslations('API.Auth');
  const data: SignUpSchema = await c.req.json();
  // TODO: 查找数据库邮箱是否存在
  const result = await AuthRepository.findEmailAlreadyExists(data.email);
  if (result) return c.json({ success: false, message: t('email-already-exists') }, 400);
  return next();
};

const userExists = async (c: Context, next: Next) => {
  const t = await getTranslations('API.Auth');
  const data: SignUpSchema = await c.req.json();
  const result = await AuthRepository.findEmailAlreadyExists(data.email);
  if (!result) return c.json({ success: false, message: t('user-not-found') });
  return next();
};

const app = new Hono<AdditionalContext>()
  .post('/signIn', zValidator('json', signInSchema), userExists, async (c) => {
    const t = await getTranslations('API.Auth');
    const { email, password } = c.req.valid('json');
    const res = await AuthService.signIn(email, password);
    if (res === null) return c.json({ success: false, message: t('invalid-password') });
    const token = signJWT({ ...res });
    // 设置cookie
    setCookie(c, AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + AUTH_COOKIE_MAX_AGE * 1000),
    });
    return c.json({ success: true, message: t('sign-in-success'), data: res });
  })
  .post('/signUp', zValidator('json', signUpSchema), alreadyExists, async (c) => {
    const t = await getTranslations('API.Auth');
    const userInfo = c.req.valid('json');
    const res = await AuthService.createUser(userInfo);
    return c.json({ success: true, message: t('sign-up-success'), data: res }, 201);
  })
  .post('/logOut', sessionMiddleware, async (c) => {
    const t = await getTranslations('API.Auth');
    deleteCookie(c, AUTH_COOKIE_NAME);
    return c.json({ success: true, message: t('log-out') });
  });

export default app;

