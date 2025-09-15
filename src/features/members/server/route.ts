import { sessionMiddleware } from '@/lib/middleware/session-middleware';
import { WorkspaceMemberService } from '@/server/service/workspace-member-service';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getTranslations } from 'next-intl/server';
import { queryWorkspaceMembersSchema } from '../schema';

const app = new Hono()
  .get('/', sessionMiddleware, zValidator('query', queryWorkspaceMembersSchema), async (c) => {
    const t = await getTranslations('API.WorkspacesMembers');
    try {
      const user = c.get('current-user');
      const { workspaceId } = c.req.valid('query');

      const member = await WorkspaceMemberService.memberInWorkspace(workspaceId, user.id);
      if (!member) {
        return c.json({ success: false, message: t('not-member') }, 403);
      }

      const members = await WorkspaceMemberService.getWorkspaceMembers(workspaceId);
      return c.json({ success: true, message: t('retrieved-success'), data: members });
    } catch (error) {
      console.error('[error get workspace members]', error instanceof Error ? error.message : error);
      return c.json({ success: false, message: t('retrieved-failed') }, 500);
    }
  })
  .delete('/:memberId', sessionMiddleware, async (c) => {
    const t = await getTranslations('API.WorkspacesMembers');
    try {
      const { memberId } = c.req.param();
      const user = c.get('current-user');
      const del = await WorkspaceMemberService.deleteWorkspaceMember(Number(memberId), user.id);
      if (!del) {
        return c.json({ success: false, message: t('delete-failed') }, 500);
      }
      return c.json({ success: true, message: t('delete-success') });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'delete-failed';
      console.error('[error delete workspace member]', msg);

      // 根据错误消息返回相应的国际化文本和状态码
      if (msg === 'member-not-found') {
        return c.json({ success: false, message: t('member-not-found') }, 404);
      } else if (msg === 'no-permission') {
        return c.json({ success: false, message: t('no-permission') }, 403);
      }

      return c.json({ success: false, message: t('delete-failed') }, 500);
    }
  });

export default app;
