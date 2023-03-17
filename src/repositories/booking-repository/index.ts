import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function create({ roomId, userId }: CreateParams) {
  const booking = await prisma.booking.create({
    data: {
      roomId,
      userId,
    }
  });
  return prisma.booking.findFirst({
    where: {
      id: booking.id,
    },
    include: {
      Room: true,
    }
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    }
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    }
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  const booking = await prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    }
  });
  return prisma.booking.findFirst({
    where: {
      id: booking.id,
    },
    include: {
      Room: true,
    }
  });
}

async function findAllBooking(hotelId: number) {
  return await prisma.booking.findMany({
    where: {
      Room: { hotelId }
    },
    include: {
      Room: true
    }
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
  findAllBooking,
};

export default bookingRepository;
