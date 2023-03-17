import { prisma } from "@/config";

async function findAllActivities() {
  return prisma.activity.findMany({
    include: {
      Local: true,
      SubscribeActivity: true,
    },
  });
}

const activityRepository = {
  findAllActivities,
};

export default activityRepository;
