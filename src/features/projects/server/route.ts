import { sessionMiddleware } from '@/lib/middleware/session-middleware';
import { ProjectService } from '@/server/service/project-service';
import { zValidator } from '@hono/zod-validator';
import { Project } from '@prisma/client';
import { Hono } from 'hono';
import { getTranslations } from 'next-intl/server';
import z from 'zod';
import { createProjectSchema } from '../schemas';

const app = new Hono()
  .get('/', sessionMiddleware, zValidator('query', z.object({ workspaceId: z.string() })), async (c) => {
    const user = c.get('current-user');
    const { workspaceId } = c.req.valid('query');
    const projects = await ProjectService.queryProject({ workspaceId }, user?.id);
    return c.json({ success: true, data: projects ?? ([] as Project[]) });
  })
  .post('/', sessionMiddleware, zValidator('json', createProjectSchema), async (c) => {
    const t = await getTranslations('API.Project');
    try {
      const user = c.get('current-user');
      if (!user) return c.json({ success: false, message: t('Unauthorized') }, 401);

      const { name, workspaceId } = c.req.valid('json');
      const project = await ProjectService.createProject({ name, workspaceId }, user.id);
      return c.json({ success: true, data: project, message: t('CreateSuccess') });
    } catch (error) {
      return c.json({ success: false, message: (error as Error).message }, 400);
    }
  });

export default app;
