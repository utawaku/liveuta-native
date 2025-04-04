import type { YoutubeChannelData } from "./youtube";
import { Dayjs } from "dayjs";
import { Schema } from "effect";

export const ChannelSortSchema = Schema.Union(
  Schema.Literal("createdAt"),
  Schema.Literal("name_kor"),
);
export type ChannelSort = typeof ChannelSortSchema.Type;

export const RawChannelItemSchema = Schema.Struct({
  channelId: Schema.String,
  nameKor: Schema.String,
  names: Schema.Array(Schema.String),
  channelAddr: Schema.String,
  handleName: Schema.String,
  waiting: Schema.Boolean,
  alive: Schema.Boolean,
  createdAt: Schema.UndefinedOr(Schema.String),
});
export type RawChannelItem = typeof RawChannelItemSchema.Type;
export type ChannelItem = Omit<RawChannelItem, "createdAt"> & {
  createdAt?: Dayjs;
};
export type ChannelList = Record<string, ChannelItem>;

export type ChannelsWithYoutubeData = {
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
  /** 1: video, 2: scheduled-video, 3: ended-stream, 4: stream, 5: scheduled-stream */
  type: Schema.Literal(1, 2, 3, 4, 5),
});
export type RawScheduleItem = typeof RawScheduleItemSchema.Type;
export type ScheduleItem = Omit<RawScheduleItem, "scheduledTime"> & {
  scheduledTime: Dayjs;
};
