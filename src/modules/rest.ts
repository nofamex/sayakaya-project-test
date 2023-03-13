import { logsRouter } from "@/routers/logs";
import { userRouter } from "@/routers/users";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

export const app: Express = express();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/user", userRouter);
app.use("/log", logsRouter);
