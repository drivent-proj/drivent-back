import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import httpStatus from "http-status";
import localsService from "@/services/locals-service";

export async function getLocals(req: AuthenticatedRequest, res: Response) {
  try {
    const locals = await localsService.get();
    return res.status(httpStatus.OK).send(locals);
  } catch (error) {
    console.log(error);
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
