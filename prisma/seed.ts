import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let ticketType = await prisma.ticketType.findFirst();
  let hotel = await prisma.hotel.findFirst();
  let room = await prisma.room.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data: 
      [
        {
          name:"Presencial",
          price:250,
          isRemote:false,
          includesHotel:false
        }, 
        {
          name:"Online",
          price:100,
          isRemote:true,
          includesHotel:false
        }, 
        {
          name:"Presencial com Hotel",
          price:600,
          isRemote:false,
          includesHotel:true
        }
      ]
    });
  }
  if (!hotel) {
    await prisma.hotel.createMany({
      data: 
        [
          {
            "id": 1,
            "name":"Driven Resort",
            "image":"https://www.kayak.pt/rimg/himg/31/34/0a/hotelsdotcom-389949-3405290e_w-297155.jpg?width=1366&height=768&crop=true"
          },
          {
            "id": 2,
            "name":"Driven Palace",
            "image":"https://panamby.com.br/wp-content/uploads/2020/10/homeslider-1500-l.jpg"
          },
          {
            "id": 3,
            "name":"Driven World",
            "image":"https://c8y3s8d4.stackpathcdn.com/wp-content/uploads/2016/04/gaylord-palms-resort-hotel.jpg"
          }
        ]
    });
  }
  if (!room) {
    await prisma.room.createMany({
      data: 
        [
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"201","capacity":2,"hotelId":2},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"201","capacity":1,"hotelId":3},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"101","capacity":1,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"201","capacity":2,"hotelId":1},
          {"name":"301","capacity":3,"hotelId":1},
          {"name":"301","capacity":3,"hotelId":1},
          {"name":"301","capacity":3,"hotelId":1},
          {"name":"301","capacity":3,"hotelId":1}
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
  });
