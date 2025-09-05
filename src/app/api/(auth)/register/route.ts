import { responseError } from "@/lib/utils/response";
import { NextRequest } from "next/server";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return responseError("缺少参数");
  }
  console.log(body);
  return new Response("User registered", { status: 201 });
}
