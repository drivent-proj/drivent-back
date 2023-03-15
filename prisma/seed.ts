import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

import dayjs from "dayjs";
const prisma = new PrismaClient();
const redis = createClient({
  url: process.env.REDIS_URL,
});

async function main() {
  await redis.connect();
  let event = await prisma.event.findFirst();
  let ticketType = await prisma.ticketType.findFirst();
  let hotel = await prisma.hotel.findFirst();
  let room = await prisma.room.findFirst();
  let local = await prisma.local.findFirst();
  let activity = await prisma.activity.findFirst();

  if (event) {
    redis.set("event", JSON.stringify(event));
  } else {
    const data = {
      title: "Driven.t",
      logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
      backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, "days").toDate(),
    };
    await prisma.event.create({
      data,
    });
    await redis.set("event", JSON.stringify(data));
  }
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data: [
        {
          name: "Presencial",
          price: 250,
          isRemote: false,
          includesHotel: false,
        },
        {
          name: "Online",
          price: 100,
          isRemote: true,
          includesHotel: false,
        },
        {
          name: "Presencial com Hotel",
          price: 600,
          isRemote: false,
          includesHotel: true,
        },
      ],
    });
  }
  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          id: 1,
          name: "Driven Resort",
          image:
            "https://www.kayak.pt/rimg/himg/31/34/0a/hotelsdotcom-389949-3405290e_w-297155.jpg?width=1366&height=768&crop=true",
        },
        {
          id: 2,
          name: "Driven Palace",
          image: "https://panamby.com.br/wp-content/uploads/2020/10/homeslider-1500-l.jpg",
        },
        {
          id: 3,
          name: "Driven World",
          image: "https://c8y3s8d4.stackpathcdn.com/wp-content/uploads/2016/04/gaylord-palms-resort-hotel.jpg",
        },
      ],
    });
  }
  if (!room) {
    await prisma.room.createMany({
      data: [
        { name: "101", capacity: 1, hotelId: 2 },
        { name: "102", capacity: 1, hotelId: 2 },
        { name: "103", capacity: 1, hotelId: 2 },
        { name: "104", capacity: 1, hotelId: 2 },
        { name: "105", capacity: 1, hotelId: 2 },
        { name: "106", capacity: 1, hotelId: 2 },
        { name: "107", capacity: 1, hotelId: 2 },
        { name: "108", capacity: 1, hotelId: 2 },
        { name: "201", capacity: 2, hotelId: 2 },
        { name: "202", capacity: 2, hotelId: 2 },
        { name: "203", capacity: 2, hotelId: 2 },
        { name: "204", capacity: 2, hotelId: 2 },
        { name: "205", capacity: 2, hotelId: 2 },
        { name: "206", capacity: 2, hotelId: 2 },
        { name: "207", capacity: 2, hotelId: 2 },
        { name: "208", capacity: 2, hotelId: 2 },
        { name: "101", capacity: 1, hotelId: 3 },
        { name: "102", capacity: 1, hotelId: 3 },
        { name: "103", capacity: 1, hotelId: 3 },
        { name: "104", capacity: 1, hotelId: 3 },
        { name: "105", capacity: 1, hotelId: 3 },
        { name: "106", capacity: 1, hotelId: 3 },
        { name: "107", capacity: 1, hotelId: 3 },
        { name: "108", capacity: 1, hotelId: 3 },
        { name: "201", capacity: 1, hotelId: 3 },
        { name: "202", capacity: 1, hotelId: 3 },
        { name: "203", capacity: 1, hotelId: 3 },
        { name: "204", capacity: 1, hotelId: 3 },
        { name: "205", capacity: 1, hotelId: 3 },
        { name: "206", capacity: 1, hotelId: 3 },
        { name: "207", capacity: 1, hotelId: 3 },
        { name: "208", capacity: 1, hotelId: 3 },
        { name: "101", capacity: 1, hotelId: 1 },
        { name: "102", capacity: 1, hotelId: 1 },
        { name: "103", capacity: 1, hotelId: 1 },
        { name: "104", capacity: 1, hotelId: 1 },
        { name: "105", capacity: 1, hotelId: 1 },
        { name: "106", capacity: 1, hotelId: 1 },
        { name: "201", capacity: 2, hotelId: 1 },
        { name: "202", capacity: 2, hotelId: 1 },
        { name: "203", capacity: 2, hotelId: 1 },
        { name: "204", capacity: 2, hotelId: 1 },
        { name: "205", capacity: 2, hotelId: 1 },
        { name: "206", capacity: 2, hotelId: 1 },
        { name: "301", capacity: 3, hotelId: 1 },
        { name: "302", capacity: 3, hotelId: 1 },
        { name: "303", capacity: 3, hotelId: 1 },
        { name: "304", capacity: 3, hotelId: 1 },
      ],
    });
  }
  if (!local) {
    await prisma.local.createMany({
      data: [
        {
          "id":1,
          "name":"Auditório Principal"
        },
        {
          "id":2,
          "name":"Auditório Lateral"
        },
        {
          "id":3,
          "name":"Sala de Workshop"
        },
      ],
    });
  }
  if(!activity) {
    await prisma.activity.createMany({
      data: [
        {
          "id":1,
          "name":"Minecraft: montando o PC ideal",
          "date":new Date("2023-10-22 15:32:45.999"),
          "startHour":new Date("2023-10-22 09:00:00"),
          "endHour":new Date("2023-10-22 10:00:00"),
          "capacity":27,
          "localId":1
        },
        {
          "id":2,
          "name":"LoL: montando o PC ideal",
          "date": new Date("2023-10-22 15:32:45.999"),
          "startHour":new Date("2023-10-22 10:00:00"),
          "endHour":new Date("2023-10-22 11:00:00"),
          "capacity":3,
          "localId":1
        },
        {
          "id":3,
          "name":"Palestra x",
          "date":new Date("2023-10-23 15:32:45.999"),
          "startHour":new Date("2023-10-23 09:00:00"),
          "endHour":new Date("2023-10-23 11:00:00"),
          "capacity":27,
          "localId":2
        },
        {
          "id":4,
          "name":"Palestra y",
          "date":new Date("2023-10-24 15:32:45.999"),
          "startHour":new Date("2023-10-24 09:00:00"),
          "endHour":new Date("2023-10-24 10:00:00"),
          "capacity":27,
          "localId":3
        },
        {
          "id":5,
          "name":"Palestra z",
          "date":new Date("2023-10-24 15:32:45.999"),
          "startHour":new Date("2023-10-24 10:00:00"),
          "endHour":new Date("2023-10-24 11:00:00"),
          "capacity":3,
          "localId":3
        },
      ]
    })
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await redis.disconnect();
  });
