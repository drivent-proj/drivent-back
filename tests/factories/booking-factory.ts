import faker from "@faker-js/faker";
import { Booking } from "@prisma/client";
import { prisma } from "@/config";

type CreateBookingParams = {
  roomId: number,
  userId: number,
}

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    }
  });
}

export function createFakeBooking(roomId: number) {
  return [{
    id: faker.random.numeric(),
    userId: faker.random.numeric(),
    roomId,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    Room: {
      id: roomId,
      name: faker.random.word(),
      capacity: faker.random.numeric(),
      hotelId: faker.random.numeric(),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }
  }];
}
