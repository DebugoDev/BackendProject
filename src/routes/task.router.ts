import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware";
import TaskSchema from "../schemas/TaskSchema";
import TaskController from "../controllers/TaskController";

const taskRouter: Router = Router();

taskRouter.post("/", validateBody(TaskSchema.creation), TaskController.create);
taskRouter.delete("/deleteTask", validateBody(TaskSchema.creation), TaskController.create);

export default taskRouter;