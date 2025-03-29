import { Effect, Schema } from "effect";
import Dayjs from "~/lib/dayjs";
import { fetchBackendAndParse } from "~/lib/fetch";
import { RawScheduleItemSchema, ScheduleItem } from "~/types/mongodb";

export const getSchedule = Effect.gen(function* (_) {
  const scheduleList = yield* _(
    fetchBackendAndParse("/schedule/get", Schema.Array(RawScheduleItemSchema)),
  );

  return scheduleList
    .map((item) => ({
      ...item,
      scheduledTime: Dayjs(item.scheduledTime),
    }))
    .sort((a, b) => (a.scheduledTime.isBefore(b.scheduledTime) ? -1 : 1)) as ScheduleItem[];
});
