import type { ScheduleItem } from "~/types/schedule";
import { Effect, Schema } from "effect";
import dayjs from "~/lib/dayjs";
import { env } from "~/lib/env";
import { fetch, parseJSON } from "~/lib/fetch";
import { RawScheduleJSON, RawScheduleJSONSchema } from "~/types/mongodb";

const ScheduleList = Schema.Array(RawScheduleJSONSchema);

const fetchSchedule = fetch(`${env.backendUrl}/schedule/get`);

const transformSchedule = (scheduleList: readonly RawScheduleJSON[]) => {
  return scheduleList.map((item) => {
    const datetime = dayjs(item.scheduledTime);
    return {
      title: item.title,
      channelName: item.channelName,
      scheduledTime: datetime,
      hide: item.hide,
      concurrentViewers: item.concurrentViewers ?? 0,
      videoId: item.videoId,
      channelId: item.channelId,
      tag: item.tag,
      type: item.isVideo
        ? "video"
        : item.broadcastStatus === true
          ? "stream"
          : datetime.isBefore(dayjs())
            ? "ended-stream"
            : "scheduled-stream",
    };
  }) as ScheduleItem[];
};

export const getSchedule = Effect.gen(function* (_) {
  const response = yield* _(fetchSchedule);
  const scheduleJSON = yield* _(parseJSON(response));
  const scheduleList = yield* _(Schema.decodeUnknownEither(ScheduleList)(scheduleJSON));

  return transformSchedule(scheduleList);
});
export { ScheduleItem };
