import { Router } from "express";
import UserSchema from "../schemas/UserSchema";
import { validateBody } from "../middlewares/validate.middleware";
import AuthController from "../controllers/AuthController";

const authRouter: Router = Router();

authRouter.post("/", validateBody(UserSchema.login), AuthController.login);

export default authRouter;