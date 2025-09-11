'use server';

import { verifyJWT } from '@/lib/utils/jwt';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from './constance';

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const auth_cookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!auth_cookie) return null;

  const user = verifyJWT(auth_cookie.value);

  if (!user) return null;

  return user;
};
