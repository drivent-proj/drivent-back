import { prisma } from "@/config";

async function findAllUserActivities(enrollmentId: number){
  return prisma.subscribeActivity.findMany({
    include: {
      Activity: true,
    },
    where: {
      enrollmentId,
    }
  })
}

async function SubscribeInActivity(enrollmentId: number, activityId: number) {
  return prisma.subscribeActivity.create({
    data: {
      enrollmentId,
      activityId 
    }
  })
}



const SubscribeActivityRepository = {
  findAllUserActivities,
  SubscribeInActivity
};

export default SubscribeActivityRepository;
