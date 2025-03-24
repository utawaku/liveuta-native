import type { YoutubeChannelData } from "./youtube";
import { Dayjs } from "dayjs";
import { Schema } from "effect";

export const RawChannelItemSchema = Schema.Struct({
  channelId: Schema.String,
  nameKor: Schema.String,
  names: Schema.Array(Schema.String),
  channelAddr: Schema.String,
  handleName: Schema.String,
  createdAt: Schema.String,
  waiting: Schema.Boolean,
  alive: Schema.Boolean,
});
export type RawChannelItem = typeof RawChannelItemSchema.Type;
export type RawChannelList = Record<string, RawChannelItem>;

export type RawChannelsWithYoutubeData = {
  contents: YoutubeChannelData[];
  total: number;
  totalPage: number;
};

export const RawScheduleItemSchema = Schema.Struct({
  title: Schema.String,
  channelName: Schema.String,
  scheduledTime: Schema.Date,
  broadcastStatus: Schema.UndefinedOr(Schema.Boolean),
  hide: Schema.Boolean,
  isVideo: Schema.Boolean,
  concurrentViewers: Schema.Number,
  videoId: Schema.String,
  channelId: Schema.String,
  tag: Schema.UndefinedOr(Schema.String),
  type: Schema.Literal("video", "scheduled-video", "stream", "ended-stream", "scheduled-stream"),
});
export type RawScheduleItem = typeof RawScheduleItemSchema.Type;
export type ScheduleItem = Omit<RawScheduleItem, "scheduledTime"> & {
  scheduledTime: Dayjs;
};
