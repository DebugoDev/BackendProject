import { createUser } from "../services/user.services";
import { Request, Response } from "express";

export default class UserController {
    public static create = async (req: Request, res: Response) => {
        const user = await createUser(req.body);
        return res.status(201).json({ user });
    }
}