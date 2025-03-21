import type { YoutubeChannelData } from "./youtube";
import { Dayjs } from "dayjs";
import { Schema } from "effect";

export type isStream = "TRUE" | "NULL" | "FALSE";

export const STAT_MAPPER = {
  TRUE: "stream",
  FALSE: "closed",
  NULL: "scheduled",
} as const;

export const ChannelSortSchema = Schema.Union(
  Schema.Literal("createdAt"),
  Schema.Literal("name_kor"),
);
export type ChannelSort = typeof ChannelSortSchema.Type;

export const ChannelDocumentSchema = Schema.Struct({
  _id: Schema.UndefinedOr(Schema.String),
  channel_id: Schema.String,
  name_kor: Schema.String,
  names: Schema.Array(Schema.String),
  channel_addr: Schema.String,
  handle_name: Schema.String,
  createdAt: Schema.String,
  waiting: Schema.Boolean,
  alive: Schema.Boolean,
});

export type ChannelDocument = typeof ChannelDocumentSchema.Type;
export type ChannelData = Omit<ChannelDocument, "_id">;
export type ChannelListData = Record<string, ChannelData>;

export type ChannelsWithYoutubeData = {
  contents: YoutubeChannelData[];
  total: number;
  totalPage: number;
};

export const ScheduleJSONSchema = Schema.Struct({
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
export type ScheduleJSON = typeof ScheduleJSONSchema.Type;

export const ScheduleSchema = Schema.Struct({
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
export type Schedule = typeof ScheduleSchema.Type;

export type LiveStream = {
  title: string;
  channelName: string;
  scheduledTime: Dayjs;
  hide: boolean;
  concurrentViewers: number;
  videoId: string;
  channelId: string;
  tag?: string;
};

export type Video = {
  title: string;
  channelName: string;
  scheduledTime: Dayjs;
  hide: boolean;
  videoId: string;
  channelId: string;
  tag?: string;
};
