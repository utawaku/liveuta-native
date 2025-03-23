import type { Dayjs } from "dayjs";

export type ScheduleItem = {
  title: string;
  channelName: string;
  scheduledTime: Dayjs;
  hide: boolean;
  concurrentViewers: number;
  videoId: string;
  channelId: string;
  tag?: string;
  type: "stream" | "ended-stream" | "scheduled-stream" | "video" | "scheduled-video";
};
