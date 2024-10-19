import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long",
  }),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be atleast 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be atleast 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
