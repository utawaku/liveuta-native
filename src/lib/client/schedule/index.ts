import { Effect, Schema } from "effect";
import { Temporal } from "temporal-polyfill";
import { fetchBackendAndParse } from "~/lib/fetch";
import { RawScheduleItemSchema, ScheduleItem } from "~/types/mongodb";

export const getSchedule = Effect.gen(function* (_) {
  const scheduleList = yield* _(
    fetchBackendAndParse("/schedule/get", Schema.Array(RawScheduleItemSchema)),
  );

  return scheduleList
    .map((item) => ({
      ...item,
      scheduledTime: Temporal.Instant.from(item.scheduledTime)
        .toZonedDateTimeISO("Asia/Seoul")
        .toPlainDateTime(),
    }))
    .sort((a, b) =>
      Temporal.PlainDateTime.compare(a.scheduledTime, b.scheduledTime),
    ) as ScheduleItem[];
});
