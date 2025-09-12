import { AdditionalContext, sessionMiddleware } from '@/lib/middleware/session-middleware';
import { WorkspaceService } from '@/server/service/workspace-service';
import { zValidator } from '@hono/zod-validator';
import { Workspace } from '@prisma/client';
import { Hono } from 'hono';
import { getTranslations } from 'next-intl/server';
import { createWorkspaceSchema } from '../schemas';

const app = new Hono<AdditionalContext>()
  .get('/', sessionMiddleware, async (c) => {
    const current = c.get('current-user');
    const workspaces = await WorkspaceService.queryWorkspaceByUserId(current.id);
    return c.json({ success: true, data: workspaces ?? ([] as Workspace[]) });
  })
  .post('/', zValidator('json', createWorkspaceSchema), sessionMiddleware, async (c) => {
    const t = await getTranslations('API.Workspace');
    const { name, description } = c.req.valid('json');
    const { id: userId } = c.get('current-user');

    const workspace = await WorkspaceService.createWorkspace({ name, description, ownerId: userId });

    if (!workspace) {
      return c.json({ success: false, message: t('create-failed') }, 500);
    }

    return c.json({ success: true, message: t('create-success'), data: workspace });
  });

export default app;

