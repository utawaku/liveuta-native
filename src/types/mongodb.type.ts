import { Schema } from "effect";
import { Temporal } from "temporal-polyfill";

import { YoutubeChannelDataSchema } from "./youtube.type";

export const MongoDateSchema = Schema.Struct({
  $date: Schema.String,
});
export type MongoDate = typeof MongoDateSchema.Type;
export const MongoDateStringSchema = Schema.Union([Schema.String, MongoDateSchema]);
export type MongoDateString = typeof MongoDateStringSchema.Type;

export const ChannelSortSchema = Schema.Literals(["createdAt", "name_kor"]);
export type ChannelSort = typeof ChannelSortSchema.Type;

export const ChannelsDirectionSchema = Schema.Literals(["1", "-1"]);
export type ChannelsDirection = typeof ChannelsDirectionSchema.Type;

export const RawChannelItemSchema = Schema.Struct({
  channelId: Schema.String,
  nameKor: Schema.String,
  names: Schema.Array(Schema.String),
  channelAddr: Schema.String,
  handleName: Schema.String,
  waiting: Schema.Boolean,
  alive: Schema.Boolean,
  createdAt: Schema.optional(MongoDateStringSchema),
  profilePictureUrl: Schema.optional(Schema.String),
});
export type RawChannelItem = typeof RawChannelItemSchema.Type;
export type ChannelItem = Omit<RawChannelItem, "createdAt"> & {
  createdAt?: Temporal.Instant;
};
export type ChannelList = Record<string, ChannelItem>;

export const ChannelsWithYoutubeDataSchema = Schema.Struct({
  contents: Schema.Array(YoutubeChannelDataSchema),
  total: Schema.Finite,
  totalPage: Schema.Finite,
});
export type ChannelsWithYoutubeData = typeof ChannelsWithYoutubeDataSchema.Type;

export type ScheduleItemType =
  "stream-live" | "stream-scheduled" | "stream-ended" | "video-live" | "video-scheduled" | "video";

export const RawScheduleItemSchema = Schema.Struct({
  title: Schema.String,
  channelName: Schema.String,
  scheduledTime: MongoDateStringSchema,
  broadcastStatus: Schema.optional(Schema.Boolean),
  hide: Schema.Boolean,
  isVideo: Schema.Boolean,
  concurrentViewers: Schema.Finite,
  videoId: Schema.String,
  channelId: Schema.String,
  tag: Schema.optional(Schema.String),
});
export type RawScheduleItem = typeof RawScheduleItemSchema.Type;
export type ScheduleItem = Omit<RawScheduleItem, "scheduledTime"> & {
  scheduledTime: Temporal.PlainDateTime;
  type: ScheduleItemType;
};
