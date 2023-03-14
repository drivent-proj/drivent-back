import activityRepository from "@/repositories/activity-repository";
import { Activity, Local, SubscribeActivity } from "@prisma/client";
import { weekdays } from "./weekdays";

async function getActivities() {
  const activities = await activityRepository.findAllActivities();

  const groupedDate = groupByDate(activities);

  return groupedDate;
}

function groupByDate(arr: ActivityWithLocalAndSubscribes[]) {
  const result = arr.reduce((acc: ActivityGroupByDate, obj: ActivityWithLocalAndSubscribes) => {
    const fullDate = obj.date.toLocaleDateString().split("/");
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

const activityService = {
  getActivities,
};

export default activityService;
