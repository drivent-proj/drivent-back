import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activity-service";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activityService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
