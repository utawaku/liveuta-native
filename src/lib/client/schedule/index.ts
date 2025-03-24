import { Effect, Schema } from "effect";
import Dayjs from "~/lib/dayjs";
import { env } from "~/lib/env";
import { fetch, parseJSON } from "~/lib/fetch";
import { RawScheduleItemSchema, ScheduleItem } from "~/types/mongodb";

const ScheduleList = Schema.Array(RawScheduleItemSchema);

const fetchSchedule = fetch(`${env.backendUrl}/schedule/get`);

export const getSchedule = Effect.gen(function* (_) {
  const response = yield* _(fetchSchedule);
  const scheduleJSON = yield* _(parseJSON(response));
  const scheduleList = yield* _(Schema.decodeUnknownEither(ScheduleList)(scheduleJSON));

  console.log(scheduleList);

  return scheduleList.map((item) => ({
    ...item,
    scheduledTime: Dayjs(item.scheduledTime),
  })) as ScheduleItem[];
});
