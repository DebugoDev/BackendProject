import { Router } from "express";
import { validateBody, validateToken } from "../middlewares/validate.middleware";
import TaskSchema from "../schemas/TaskSchema";
import TaskController from "../controllers/TaskController";

const taskRouter: Router = Router();

taskRouter.use(validateToken);

taskRouter.post("/", validateBody(TaskSchema.creation), TaskController.create);
taskRouter.delete("/:id", TaskController.remove);
taskRouter.get("/", TaskController.list);
taskRouter.get("/:id", TaskController.retrieve);
taskRouter.put("/:id", validateBody(TaskSchema.update), TaskController.update);


export default taskRouter;