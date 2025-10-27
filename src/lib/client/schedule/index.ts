import { Effect, Schema } from "effect";
import { Temporal } from "temporal-polyfill";

import { fetchBackendAndParse } from "~/lib/fetch";
import { RawScheduleItemSchema, ScheduleItem, ScheduleItemType } from "~/types/mongodb.type";

export const getSchedule = Effect.gen(function* (_) {
  const scheduleList = yield* _(
    fetchBackendAndParse("/schedule/get", Schema.Array(RawScheduleItemSchema)),
  );

  const now = Temporal.Now.plainDateTimeISO();
  const todayStart = now.with({ hour: 0, minute: 0, second: 0 });

  type ItemWithoutType = Omit<ScheduleItem, "type">;
  const isLiveStream = (item: ItemWithoutType) =>
    item.broadcastStatus === true ||
    (Temporal.PlainDateTime.compare(item.scheduledTime, todayStart) >= 0 &&
      Temporal.PlainDateTime.compare(item.scheduledTime, now) <= 0 &&
      item.scheduledTime.hour === now.hour);

  const isScheduledStream = (item: ItemWithoutType) =>
    item.broadcastStatus === false && Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 0;

  const isLiveVideo = (item: ItemWithoutType) =>
    Temporal.PlainDateTime.compare(item.scheduledTime, now) <= 0 &&
    Temporal.PlainDateTime.compare(
      item.scheduledTime,
      now.add({
        minutes: -5,
      }),
    ) >= 0;

  const isScheduledVideo = (item: ItemWithoutType) =>
    Temporal.PlainDateTime.compare(item.scheduledTime, now) === 1;

  return scheduleList
    .map((item) => ({
      ...item,
      scheduledTime: Temporal.Instant.from(item.scheduledTime)
        .toZonedDateTimeISO("Asia/Seoul")
        .toPlainDateTime(),
    }))
    .sort((a, b) => Temporal.PlainDateTime.compare(a.scheduledTime, b.scheduledTime))
    .map((item) => {
      let type: ScheduleItemType = "stream-live";

      if (item.isVideo) {
        if (isLiveVideo(item)) {
          type = "video-live";
        } else if (isScheduledVideo(item)) {
          type = "video-scheduled";
        } else {
          type = "video";
        }
      } else {
        if (isLiveStream(item)) {
          type = "stream-live";
        } else if (isScheduledStream(item)) {
          type = "stream-scheduled";
        } else {
          type = "stream-ended";
        }
      }

      return {
        ...item,
        type,
      };
    }) as ScheduleItem[];
});
