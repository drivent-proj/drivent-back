import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activity.findMany({
    include: {
      Local: true,
      SubscribeActivity: true,
    },
  });
}

async function findActivityById(activityId: number) {
  return prisma.activity.findUnique({
    where: {
      id : activityId
    }
  })
}





const activityRepository = {
  findAllActivities,
  findActivityById
};

export default activityRepository;
