import UserSchema from "../schemas/UserSchema";
import UserController from "../controllers/UserController";
import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware";

const userRouter: Router = Router();

userRouter.post("/", validateBody(UserSchema.creation), UserController.create);

export default userRouter;