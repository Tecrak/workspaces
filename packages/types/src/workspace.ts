import z from "zod";

export const taskSchema = z.object({
  title: z.string(),
});

export const boardSchema = z.object({
  name: z.string().max(15, "Максимум 15"),
  tasks: z.array(taskSchema),
});

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(5, "Мінімум 5 символів")
    .max(30, "Максимум 30 симовлів")
    .refine((val) => val === val.toLocaleLowerCase(), "мАЄ бути з малої"),
  boards: z.array(boardSchema),
});

export const patchNameSchema = z.object({
  name: z
    .string()
    .min(5, "Мінімум 5 символів")
    .max(30, "Максимум 30 симовлів")
    .refine((val) => val === val.toLocaleLowerCase(), "мАЄ бути з малої"),
});

export const roleSchema = z.enum(["EDITOR", "VIEWER"]);

// Типи форми (без id бо воно саме генериться)
export type FormValues = z.infer<typeof workspaceSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
export type BoardFormValues = z.infer<typeof boardSchema>;
export type Role = z.infer<typeof roleSchema>;

export interface WorkspaceMember {
  id: string;
  userId: string;
  role: Role;
  user: { id: string; email: string };
}

export interface Task extends TaskFormValues {
  id: string;
}

export interface Board extends BoardFormValues {
  id: string;
  tasks: Task[];
}

export interface Workspace {
  id: string;
  name: string;
  boards: Board[];
}

export interface PatchWSNameVariables {
  id: string;
  name: string;
}
