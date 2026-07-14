import z from "zod";

export const userSchema = z.object({
  email: z.email().min(1, "Я щось не вірю це реально така коротка пошта"),
  password: z.string().min(5),
});

export const authInput = z.object({
  email: z.email().min(1, "Я щось не вірю це реально така коротка пошта"),
  password: z.string().min(5),
});

export type UserValues = z.infer<typeof userSchema>;
export type AuthValues = z.infer<typeof authInput>;

export interface SignInData {
  id: string;
  email: string;
}
