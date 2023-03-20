import activityRepository from "@/repositories/activity-repository";
import { Activity, Local, SubscribeActivity } from "@prisma/client";
import { weekdays } from "./weekdays";
import enrollmentRepository from "@/repositories/enrollment-repository";
import SubscribeActivityRepository from "@/repositories/subscribeActivity-repository";
import { TimeConflictError } from "@/errors/TimeConflict-error";

async function getActivities() {
  const activities = await activityRepository.findAllActivities();

  const groupedDate = groupByDate(activities);

  return groupedDate;
}

function groupByDate(arr: ActivityWithLocalAndSubscribes[]) {
  const result = arr.reduce((acc: ActivityGroupByDate, obj: ActivityWithLocalAndSubscribes) => {
    const fullDate = obj.date.toLocaleDateString("pt-BR").split("/");
    const dayMonth = fullDate[0] + "/" + fullDate[1];
    const day = obj.date.getDay();

    if (!acc[dayMonth]) {
      acc[dayMonth] = { date: dayMonth, weekday: weekdays[day], activies: [obj] };
    } else {
      acc[dayMonth].activies.push(obj);
    }
    return acc;
  }, {});

  return Object.values(result);
}

type ActivityWithLocalAndSubscribes = Activity & { Local: Local; SubscribeActivity: SubscribeActivity[] };
type ActivityGroupByDate = Record<
  string,
  { date: string; weekday: string; activies: ActivityWithLocalAndSubscribes[] }
>;

async function SubscribeinActivity(userId : number , activityId: number){
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  await checkTimeConflict(enrollment.id, activityId)
  return await SubscribeActivityRepository.SubscribeInActivity(userId, activityId)

}

async function checkTimeConflict(enrollmentId: number, activityId: number) {
  const userActivities = await SubscribeActivityRepository.findAllUserActivities(enrollmentId);
  const diseredActivity = await activityRepository.findActivityById(activityId);
  userActivities.forEach((act) =>  {if((diseredActivity.endHour >= act.Activity.startHour && diseredActivity.endHour <= act.Activity.endHour) || (diseredActivity.startHour >= act.Activity.startHour && diseredActivity.startHour < act.Activity.endHour)) {
    throw TimeConflictError(act.Activity.name)
  }})
}

const activityService = {
  getActivities,
  SubscribeinActivity
};

export default activityService;
