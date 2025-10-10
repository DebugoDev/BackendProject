import { Request, Response } from "express";
import { login } from "../services/auth.service";

export default class AuthController {
    public static login = async (req: Request, res: Response) => {
        const token = await login(req.body);
        return res.status(201).json({ token });
    }
}