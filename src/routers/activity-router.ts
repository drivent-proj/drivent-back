import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, SubscribeinActivity } from "@/controllers";

const activityRouter = Router();

activityRouter.all("/*", authenticateToken)
    .get("/", listActivities)
    .post("/", SubscribeinActivity)

export { activityRouter };
