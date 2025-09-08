import { AUTH_COOKIE_NAME } from '@/features/auth/constance';
import { verifyJWT } from '@/lib/utils/jwt';
import { User } from '@prisma/client';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

export type AdditionalContext = {
  Variables: {
    'current-user': Omit<User, 'password'>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const token = getCookie(c, AUTH_COOKIE_NAME);

  if (!token) {
    return c.json({ success: false, message: '请先登录' }, 401);
  }

  // 验证 JWT 签名
  const user = verifyJWT(token);
  if (!user) {
    return c.json({ success: false, message: '无效的会话令牌' }, 401);
  }

  c.set('current-user', user);
  await next();
});

