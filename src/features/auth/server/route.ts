import { Context, Hono, Next } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, SignUpSchema, signUpSchema } from "../schemas";

const alreadyExists = async (c: Context, next: Next) => {
  const data: SignUpSchema = await c.req.json();
  // TODO: 查找数据库邮箱是否存在
  return next();
};

const app = new Hono()
  .post("/login", zValidator("json", signInSchema), (c) => {
    const { email, password } = c.req.valid("json");
    return c.json({ email, password });
  })
  .post("/signUp", zValidator("json", signUpSchema), alreadyExists, (c) => {
    const { username, email, password } = c.req.valid("json");
    return c.json({ username, email, password });
  });

export default app;
