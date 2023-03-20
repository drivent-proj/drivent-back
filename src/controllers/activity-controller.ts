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

export async function SubscribeinActivity(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activityId } = req.body;
    const subscribed = await activityService.SubscribeinActivity(userId, activityId);
    return res.sendStatus(httpStatus.OK)

  } catch (error){
    return res.status(httpStatus.CONFLICT).send(error.message)
  }
}