import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getAllBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .get("/:roomId", getAllBooking)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
