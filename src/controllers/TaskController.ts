import { Request, Response, NextFunction } from "express";
import TaskSchema, { TTaskCreation } from "../schemas/TaskSchema";
import { createTask, deleteTask } from "../services/task.services";

export default class TaskController {
    public static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userSession.id;

            const parsed: TTaskCreation = TaskSchema.creation.parse({
                ...req.body,
                userId,
            });

            const newTask = await createTask(parsed, userId);
            return res.status(201).json(newTask);
        } catch (error) {
            next(error);
        }
    };

    public static remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userSession.id;
            const taskId = req.params.id;

            await deleteTask(taskId, userId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
