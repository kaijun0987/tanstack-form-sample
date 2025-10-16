import { z } from "zod";

export const zodSchema = z.object({
  name: z.string(),
  age: z.string().min(5),
});

export type TZodSchema = z.infer<typeof zodSchema>;

// const schema = z
//   .object({
//     password: z.string().min(6),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
//   });
