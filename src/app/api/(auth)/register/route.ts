import { responseError, responseSuccess } from "@/lib/utils/response";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const t = await getTranslations("API.Register");
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return responseError(t("paramsError"), 400);
  }
  console.log(body);
  return responseSuccess(null, t("success"), 201);
}
