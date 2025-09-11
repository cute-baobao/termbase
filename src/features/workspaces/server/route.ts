import { Hono } from 'hono';

const app = new Hono().post('/', (c) => {
  return c.text('Hello Workspaces');
});

export default app;

