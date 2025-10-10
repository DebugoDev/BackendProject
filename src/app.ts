﻿import express from "express";
import cors from "cors";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import { handleError } from "./middlewares/handle.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(handleError);

export default app;