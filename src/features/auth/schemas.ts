import { email } from "@/lib/fileds";
import z from "zod";

export const signInSchema = z.object({
  email: email,
  password: z.string().min(6).max(20),
});

export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: email,
  password: z.string().min(6).max(20),
});
    


export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
