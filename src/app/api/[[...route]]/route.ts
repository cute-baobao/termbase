import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from '@/features/auth/server/route';
import termbase from '@/features/termbase/server/route';
import workspaceMembers from '@/features/members/server/route';
import workspaces from '@/features/workspaces/server/route';

const app = new Hono().basePath('/api');

const routes = app
  .route('/auth', auth)
  .route('/termbases', termbase)
  .route('/workspaces', workspaces)
  .route('/members', workspaceMembers);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
