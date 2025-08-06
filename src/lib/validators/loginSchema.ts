import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;