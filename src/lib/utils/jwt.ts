import { env } from '@/env';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = env.JWT_SECRET;

export const signJWT = (payload: Omit<User, 'password'>): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d', issuer: 'termbase-app' });
};

export const verifyJWT = (token: string): Omit<User, 'password'> | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Omit<User, 'password'>;
    return decoded;
  } catch (e) {
    console.error('JWT verification failed:', e instanceof Error ? e.message : e);
    return null;
  }
};

