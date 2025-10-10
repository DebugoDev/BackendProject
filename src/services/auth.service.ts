import "dotenv/config";
import jwt from "jsonwebtoken";
import AppError from "../errors";
import AppDataSource from "../config/data-source";
import { compare } from "bcryptjs";
import { TUserLogin } from "../schemas/UserSchema";
import User from "../entities/User";

export const login = async (payload: TUserLogin): Promise<string> => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
        where: { username: payload.username },
    });

    if (!user) throw new AppError("Invalid login", 401);

    const isPasswordValid = await compare(payload.password, user.password!);
    if (!isPasswordValid) throw new AppError("Invalid password", 401);

    const secret = process.env.SECRET_KEY;
    if (!secret) throw new AppError("SECRET_KEY not defined", 500);

    return jwt.sign({ id: user.id }, secret, { expiresIn: "60d" });
};

export const verifyToken = async (token: string): Promise<string | null> => {
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new AppError("SECRET_KEY not defined", 500);

    try {
        const decoded = jwt.verify(token, secret) as { id: string };
        return decoded.id || null;
    } catch {
        return null;
    }
};