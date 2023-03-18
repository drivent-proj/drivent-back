import { prisma, redis } from '@/config';
import { string } from 'joi';
import { Event } from '@prisma/client';

async function findFirst(): Promise<Event> {
  const event = await redis.get('event');
  if (event) {
    const eventParsed: Event = JSON.parse(event);
    return eventParsed;
  } else {
    const prismaEvent = await prisma.event.findFirst();
    if (prismaEvent) {
      await redis.set('event', JSON.stringify(prismaEvent));
    }
    return prismaEvent;
  }
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
