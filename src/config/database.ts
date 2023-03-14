import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function connectRedis() {
  redis.on("error", (err) => console.log("Redis Client Error", err));
  await redis.connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
