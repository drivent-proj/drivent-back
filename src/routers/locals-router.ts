import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getLocals } from "@/controllers/locals-controller";

const localRouter = Router();

localRouter.all("/*", authenticateToken).get("/", getLocals);

export { localRouter };
