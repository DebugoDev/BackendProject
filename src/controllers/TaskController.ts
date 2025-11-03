import { Request, Response } from "express";
import TaskSchema, { TTaskCreation, TTaskDeletion } from "../schemas/TaskSchema";
import { createTask, deleteTask } from "../services/task.services";

export const create = async (req: Request, res: Response) => {
    try {
        const parsed: TTaskCreation = TaskSchema.creation.parse(req.body);
        const newTask = await createTask(parsed);
        return res.status(201).json(newTask);
    } catch (error: any) {
        return res.status(400).json({ message: error.errors || "Erro ao criar tarefa" });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const parsed: TTaskDeletion = TaskSchema.deletion.parse({
            id: req.params.id,
            userId: req.body.userId,
        });

        await deleteTask(parsed.id, parsed.userId);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(400).json({ message: error || "Erro ao deletar tarefa" });
    }
};