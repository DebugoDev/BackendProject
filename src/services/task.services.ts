import AppDataSource from "../config/data-source";
import Task from "../entities/Task";
import User from "../entities/User";
import AppError from "../errors";
import { TTaskCreation } from "../schemas/TaskSchema";

export const createTask = async (payload: TTaskCreation, userId: string): Promise<Partial<Task>> => {
    const taskRepo = AppDataSource.getRepository(Task);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new AppError("Usuário não encontrado!", 404);

    const existing = await taskRepo.findOne({
        where: { title: payload.title, user: { id: userId } },
    });

    if (existing) throw new AppError("Já existe uma tarefa com este título!", 400);

    const task = taskRepo.create({
        title: payload.title,
        description: payload.description,
        done: payload.done ?? false,
        user,
    });

    const created = await taskRepo.save(task);

    return {
        id: created.id,
        title: created.title,
        description: created.description,
        done: created.done,
        user: { id: user.id, username: user.username },
    };
};

export const deleteTask = async (id: string, userId: string): Promise<void> => {
    const repo = AppDataSource.getRepository(Task);

    const task = await repo.findOne({
        where: { id },
        relations: ["user"],
    });

    if (!task) throw new AppError("Tarefa não encontrada!", 404);

    if (task.user?.id !== userId) throw new AppError("Não autorizado!", 403);

    await repo.remove(task);
};

export const listTasks = async (userId: string): Promise<Partial<Task>[]> => {
    const repo = AppDataSource.getRepository(Task);

    const tasks = await repo.find({
        where: { user: { id: userId } },
        relations: ["user"],
    });

    return tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        done: t.done,
    }));
};

export const getTaskById = async (id: string, userId: string): Promise<Partial<Task>> => {
    const repo = AppDataSource.getRepository(Task);

    const task = await repo.findOne({
        where: { id },
        relations: ["user"],
    });

    if (!task) throw new AppError("Tarefa não encontrada!", 404);
    if (task.user?.id !== userId) throw new AppError("Não autorizado!", 403);

    return {
        id: task.id,
        title: task.title,
        description: task.description,
        done: task.done,
    };
};

export const updateTask = async (
    id: string,
    userId: string,
    payload: Partial<Task>
): Promise<Partial<Task>> => {
    const repo = AppDataSource.getRepository(Task);

    const task = await repo.findOne({
        where: { id },
        relations: ["user"],
    });

    if (!task) throw new AppError("Tarefa não encontrada!", 404);
    if (task.user?.id !== userId) throw new AppError("Não autorizado!", 403);

    repo.merge(task, payload);
    const updated = await repo.save(task);

    return {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        done: updated.done,
    };
};
