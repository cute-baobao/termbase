import { responseError, responseSuccess } from "@/lib/utils/response";
import { getTranslations } from "next-intl/server";
import { NextRequest } from "next/server";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const t = await getTranslations("API.Login");
  
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    
    if (!parsed.success) {
      return responseError(t("paramsError"), 400);
    }

    // TODO: 实现实际的登录逻辑
    console.log("Login attempt:", body);
    
    return responseSuccess(
      { token: "dummy-token" }, 
      t("success"), 
      200
    );
  } catch (error) {
    return responseError(t("serverError"), 500);
  }
}