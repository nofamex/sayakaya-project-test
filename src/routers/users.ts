import { prisma } from "@/utils/prisma";
import { Router, Request, Response } from "express";
import { OK } from "http-status-codes";

export const userRouter: Router = Router();

userRouter.get("/promo", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany({ include: { promos: true } });
  return res.status(OK).json(users);
});
