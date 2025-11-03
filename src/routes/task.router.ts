import { Router } from "express";
import { validateBody, validateToken } from "../middlewares/validate.middleware";
import TaskSchema from "../schemas/TaskSchema";
import TaskController from "../controllers/TaskController";

const taskRouter: Router = Router();

taskRouter.use(validateToken);

taskRouter.post("/", validateBody(TaskSchema.creation), TaskController.create);
taskRouter.delete("/:id", TaskController.remove);

export default taskRouter;