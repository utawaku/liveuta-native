import { Schema } from "effect";

export type YoutubeChannelRow = [string, string, string];

const ThumbnailSchema = Schema.Struct({
  url: Schema.optional(Schema.String),
  width: Schema.optional(Schema.Finite),
  height: Schema.optional(Schema.Finite),
});

export const YoutubeChannelDataSchema = Schema.Struct({
  uid: Schema.String,
  nameKor: Schema.String,
  url: Schema.String,
  alive: Schema.Boolean,
  createdAt: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  snippet: Schema.optional(
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      customUrl: Schema.optional(Schema.String),
      publishedAt: Schema.optional(Schema.String),
      thumbnails: Schema.optional(Schema.Record(Schema.String, ThumbnailSchema)),
    }),
  ),
  statistics: Schema.optional(
    Schema.Struct({
      subscriberCount: Schema.optional(Schema.String),
      videoCount: Schema.optional(Schema.String),
      viewCount: Schema.optional(Schema.String),
      hiddenSubscriberCount: Schema.optional(Schema.Boolean),
    }),
  ),
});

export type YoutubeChannelData = typeof YoutubeChannelDataSchema.Type;
