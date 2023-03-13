import { prisma } from "@/utils/prisma";
import { Router, Request, Response } from "express";
import { OK } from "http-status-codes";

export const logsRouter: Router = Router();

logsRouter.get("", async (req: Request, res: Response) => {
  const logs = await prisma.logs.findMany();
  return res.status(OK).json(logs);
});
