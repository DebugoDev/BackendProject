import { z } from "zod";

export default class TaskSchema {
    public static creation = z.object({
        title: z.string().max(100, "O título deve ter no máximo 100 caracteres"),
        description: z.string().max(255, "A descrição deve ter no máximo 255 caracteres"),
        done: z.boolean().optional(),
    });

    public static update = z.object({
        title: z.string().max(100, "O título deve ter no máximo 100 caracteres"),
        description: z.string().max(255, "A descrição deve ter no máximo 255 caracteres"),
        done: z.boolean().optional(),
    });
}

export type TTaskCreation = z.infer<typeof TaskSchema.creation>;
export type TTaskUpdate = z.infer<typeof TaskSchema.update>;
