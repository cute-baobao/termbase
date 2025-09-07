import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema } from "../schemas";

const app = new Hono()
  .post("/login", zValidator("json", signInSchema), (c) => {
    const { email, password } = c.req.valid("json");
    return c.json({ email, password });
  })
  .post("/register", (c) => c.text("Register Page"));

export default app;
