import AppDataSource from "../config/data-source"
import User from "../entities/User"
import AppError from "../errors";

import { genSalt, hash } from "bcryptjs";
import { TUserCreation } from "../schemas/UserSchema"

export const createUser = async (payload: TUserCreation): Promise<Partial<User>> => {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({
        where: { username: payload.username }
    })

    if (user)
        throw new AppError("Username already in user!", 400);

    const salt = await genSalt(12);
    const hashedPassword = await hash(payload.password, salt);

    const obj: User = repo.create({ ...payload, password: hashedPassword });
    const createdUser = await repo.save(obj);

    return { ...createdUser, password: undefined };
}