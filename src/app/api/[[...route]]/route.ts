import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getTranslations } from "next-intl/server";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const app = new Hono().basePath("/api");

app.get("/hello", async (c) => {
  const t = await getTranslations("API.Register");
  return c.json(t("paramsError"));
});

app.get("/project/:projectId", (c) => {
  const { projectId } = c.req.param();
  return c.json({ projectId });
});

app.post("/v1/sign-in", async (c) => {
  const t = await getTranslations("API.Register");
  const body = await c.req.json();
  const signInBody = registerSchema.safeParse(body);
  if (!signInBody.success) {
    return c.json(t("paramsError"), 400);
  }
  return c.json(signInBody.data);
});

export const GET = handle(app);

export const POST = handle(app);
