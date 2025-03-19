import { Effect, Schema } from "effect";
import { LiveStream, ScheduleJSON, ScheduleJSONSchema, Video } from "~/types/mongodb";
import dayjs from "../dayjs";
import { env } from "../env";
import { fetch, parseJSON } from "../fetch";

const ScheduleList = Schema.Array(ScheduleJSONSchema);

const fetchSchedule = fetch(`${env.backendUrl}/schedule/get`);

const splitSchedule = (scheduleList: readonly ScheduleJSON[]) => {
  const endedLiveStreams: LiveStream[] = [];
  const scheduledLiveStreams: LiveStream[] = [];
  const liveStreams: LiveStream[] = [];
  const videos: Video[] = [];
  const scheduledVideos: Video[] = [];

  const now = dayjs();

  for (let i = 0; i < scheduleList.length; ++i) {
    const datetime = dayjs(scheduleList[i].scheduledTime);

    if (scheduleList[i].isVideo) {
      if (now.isBefore(datetime)) {
        scheduledVideos.push({
          title: scheduleList[i].title,
          channelName: scheduleList[i].channelName,
          scheduledTime: datetime,
          hide: scheduleList[i].hide,
          videoId: scheduleList[i].videoId,
          channelId: scheduleList[i].channelId,
          tag: scheduleList[i].tag,
        });
      } else {
        videos.push({
          title: scheduleList[i].title,
          channelName: scheduleList[i].channelName,
          scheduledTime: datetime,
          hide: scheduleList[i].hide,
          videoId: scheduleList[i].videoId,
          channelId: scheduleList[i].channelId,
          tag: scheduleList[i].tag,
        });
      }

      continue;
    }

    if (scheduleList[i].broadcastStatus === true) {
      liveStreams.push({
        title: scheduleList[i].title,
        channelName: scheduleList[i].channelName,
        scheduledTime: datetime,
        hide: scheduleList[i].hide,
        concurrentViewers:
          typeof scheduleList[i].concurrentViewers === "number"
            ? (scheduleList[i].concurrentViewers as number)
            : 0,
        videoId: scheduleList[i].videoId,
        channelId: scheduleList[i].channelId,
        tag: scheduleList[i].tag,
      });

      continue;
    }
    if (now.isBefore(datetime)) {
      scheduledLiveStreams.push({
        title: scheduleList[i].title,
        channelName: scheduleList[i].channelName,
        scheduledTime: datetime,
        hide: scheduleList[i].hide,
        concurrentViewers:
          typeof scheduleList[i].concurrentViewers === "number"
            ? (scheduleList[i].concurrentViewers as number)
            : 0,
        videoId: scheduleList[i].videoId,
        channelId: scheduleList[i].channelId,
        tag: scheduleList[i].tag,
      });
    } else {
      endedLiveStreams.push({
        title: scheduleList[i].title,
        channelName: scheduleList[i].channelName,
        scheduledTime: datetime,
        hide: scheduleList[i].hide,
        concurrentViewers:
          typeof scheduleList[i].concurrentViewers === "number"
            ? (scheduleList[i].concurrentViewers as number)
            : 0,
        videoId: scheduleList[i].videoId,
        channelId: scheduleList[i].channelId,
        tag: scheduleList[i].tag,
      });
    }
  }

  console.log(`${endedLiveStreams.length} - ${endedLiveStreams[0]}`);
  console.log(`${liveStreams.length} - ${liveStreams[0]}`);
  console.log(`${scheduledLiveStreams.length} - ${scheduledLiveStreams[0]}`);
  console.log(`${videos.length} - ${videos[0]}`);
  console.log(`${scheduledVideos.length} - ${scheduledVideos[0]}`);

  return { endedLiveStreams, liveStreams, scheduledLiveStreams, videos, scheduledVideos };
};

export const getSchedule = Effect.gen(function* (_) {
  const response = yield* _(fetchSchedule);
  const scheduleJSON = yield* _(parseJSON(response));
  const scheduleList = yield* _(Schema.decodeUnknownEither(ScheduleList)(scheduleJSON));

  console.log(`${scheduleList.length} - ${scheduleList[0]}`);

  return splitSchedule(scheduleList);
});
