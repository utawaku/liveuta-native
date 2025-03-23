import type { YoutubeChannelData } from "./youtube";
import { Schema } from "effect";

export const RawChannelJSONSchema = Schema.Struct({
  channelId: Schema.String,
  nameKor: Schema.String,
  names: Schema.Array(Schema.String),
  channelAddr: Schema.String,
  handleName: Schema.String,
  createdAt: Schema.String,
  waiting: Schema.Boolean,
  alive: Schema.Boolean,
});
export type RawChannel = typeof RawChannelJSONSchema.Type;
export type RawChannelListData = Record<string, RawChannel>;

export type RawChannelsWithYoutubeData = {
  contents: YoutubeChannelData[];
  total: number;
  totalPage: number;
};

export const RawScheduleJSONSchema = Schema.Struct({
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
});
export type RawScheduleJSON = typeof RawScheduleJSONSchema.Type;

export const RawScheduleSchema = Schema.Struct({
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
});
export type RawSchedule = typeof RawScheduleSchema.Type;
