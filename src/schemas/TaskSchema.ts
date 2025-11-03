import { z } from "zod";

export default class TaskSchema {
  public static creation = z.object({
    title: z.string().max(100, "O título deve ter no máximo 100 caracteres"),
    description: z.string().max(255, "A descrição deve ter no máximo 255 caracteres"),
    done: z.boolean().optional(),
    userId: z.string().uuid("ID de usuário inválido"),
  });

  public static deletion = z.object({
    id: z.string().uuid("ID de tarefa inválido"),
    userId: z.string().uuid("ID de usuário inválido"),
  });
}

export type TTaskCreation = z.infer<typeof TaskSchema.creation>;
export type TTaskDeletion = z.infer<typeof TaskSchema.deletion>;