import { inviteWorkspaceMemberSchema } from '@/features/members/schema';
import { AdditionalContext, sessionMiddleware } from '@/lib/middleware/session-middleware';
import { WorkspaceService } from '@/server/service/workspace-service';
import { zValidator } from '@hono/zod-validator';
import { Workspace } from '@prisma/client';
import { Hono } from 'hono';
import { getTranslations } from 'next-intl/server';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../schemas';

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
  })
  .patch('/:workspaceId', zValidator('json', updateWorkspaceSchema), sessionMiddleware, async (c) => {
    const t = await getTranslations('API.Workspace');
    try {
      const user = c.get('current-user');
      const { workspaceId } = c.req.param();
      const updateData = c.req.valid('json');
      const response = await WorkspaceService.updateWorkspace(workspaceId, user.id, updateData);
      return c.json({ success: true, message: t('update-success'), data: response });
    } catch (error) {
      console.log('[error update workspace]', error instanceof Error ? error.message : error);
      return c.json({ success: false, message: t((error as Error).message) || 'Update workspace failed' }, 500);
    }
  })
  .delete('/:workspaceId', sessionMiddleware, async (c) => {
    const t = await getTranslations('API.Workspace');
    try {
      const user = c.get('current-user');
      const { workspaceId } = c.req.param();
      await WorkspaceService.deleteWorkspace(workspaceId, user.id);
      return c.json({ success: true, message: t('delete-success'), data: workspaceId });
    } catch (error) {
      console.log('[error delete workspace]', error instanceof Error ? error.message : error);
      return c.json({ success: false, message: t((error as Error).message) || 'Delete workspace failed' }, 500);
    }
  })
  .post('/:workspaceId/generate-invite-link', zValidator('json', inviteWorkspaceMemberSchema), sessionMiddleware, async (c) => {
    const t = await getTranslations('API.Workspace');
    try {
      const user = c.get('current-user');
      const { workspaceId } = c.req.param();
      const inviteData = c.req.valid('json');
      const inviteLink = await WorkspaceService.generateInviteLink(workspaceId, user.id, inviteData);
      return c.json({ success: true, message: t('generate-invite-link-success'), data: inviteLink });
    } catch (error) {
      console.log('[error generate invite link]', error instanceof Error ? error.message : error);
      return c.json({ success: false, message: t((error as Error).message) || 'Generate invite link failed' }, 500);
    }
  });

export default app;
