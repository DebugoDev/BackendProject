import AppError from "../errors";
import UserSession from "../sessions/UserSession";
import { ZodTypeAny, ZodError } from "zod";
import { verifyToken } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            next(error);
        } else {
            next(error);
        }
    }
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) throw new AppError("Missing bearer token!", 401);

        const [, token] = auth.split(" ");
        const userId = await verifyToken(token)
        if (!userId) throw new AppError("Invalid token!", 401);

        (req as any).userSession = new UserSession(userId);
        next();
    } catch (error) {
        next(error);
    }
};

