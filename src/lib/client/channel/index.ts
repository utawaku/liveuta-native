import type { ChannelsDirection, ChannelSort } from "~/types/mongodb.type";

import { Effect, Schema } from "effect";

import { fetchBackendAndParse } from "~/lib/fetch";
import { toTemporalInstant } from "~/lib/temporal";
import { ChannelsWithYoutubeDataSchema, RawChannelItemSchema } from "~/types/mongodb.type";

export const getChannelById = (id: string) =>
  fetchBackendAndParse(`/channel/get/${encodeURIComponent(id)}`, RawChannelItemSchema).pipe(
    Effect.map((channel) => ({ ...channel, createdAt: toTemporalInstant(channel.createdAt) })),
  );

export const getChannels = fetchBackendAndParse(
  "/channel/getAll",
  Schema.Array(RawChannelItemSchema),
).pipe(
  Effect.map((channels) =>
    channels.map((channel) => ({ ...channel, createdAt: toTemporalInstant(channel.createdAt) })),
  ),
);

export const getChannelsCount = fetchBackendAndParse("/channel/getCount", Schema.Finite).pipe(
  Effect.retry({ times: 3 }),
);

export const getChannelsWithYoutubeData = (
  size: number,
  page: number,
  sort: ChannelSort,
  query = "",
) => {
  const params = new URLSearchParams({ size: String(size), page: String(page), sort, query });
  return fetchBackendAndParse(`/channel/getYoutube?${params}`, ChannelsWithYoutubeDataSchema);
};

export const getPagedChannels = (
  size: number,
  page: number,
  sort: ChannelSort = "name_kor",
  direction: ChannelsDirection = "1",
  query = "",
) => {
  const params = new URLSearchParams({
    size: String(size),
    page: String(page),
    sort,
    direction,
    query,
  });
  return fetchBackendAndParse(
    `/channel/getPagedChannels?${params}`,
    Schema.Array(RawChannelItemSchema),
  );
};
