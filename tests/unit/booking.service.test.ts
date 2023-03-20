import bookingService from "@/services/booking-service";
import bookingRepository from "@/repositories/booking-repository";
import { createFakeBooking } from "../factories";

describe("bookingService unit test suite", () => {
  describe("getAllBooking tests", () => {
    it("should respond with booking array", async () => {
      const roomId = 2;

      const fakeBooking = createFakeBooking(roomId);

      jest.spyOn(bookingRepository, "findAllBooking").mockImplementationOnce( (): any => {
        return fakeBooking;
      });
     
      const bookings = await bookingService.getAllBooking(roomId);
      expect(bookings).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: fakeBooking[0].id,
          userId: fakeBooking[0].userId,
          roomId: fakeBooking[0].roomId,
          createdAt: fakeBooking[0].createdAt,
          updatedAt: fakeBooking[0].updatedAt,
          Room: fakeBooking[0].Room
        })
      ]));
    });

    it("should respond with error", async () => {
      const roomId = 0;

      jest.spyOn(bookingRepository, "findAllBooking").mockImplementationOnce((): any => {
        return undefined;
      });

      const promise = bookingService.getAllBooking(roomId);
      expect(promise).rejects.toEqual({
        name: "NotFoundError",
        message: "No result for this search!",
      });
    });
  });
});
