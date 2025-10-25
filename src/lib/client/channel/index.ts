import { Effect, Schema } from "effect";

import Dayjs from "~/lib/dayjs";
import { fetchBackend, fetchBackendAndParse, parseJSON } from "~/lib/fetch";
import {
  ChannelItem,
  ChannelSort,
  ChannelsWithYoutubeData,
  RawChannelItemSchema,
} from "~/types/mongodb";

export const getChannelById = (id: string) =>
  Effect.gen(function* (_) {
    const channel = yield* _(fetchBackendAndParse(`/channel/get/${id}`, RawChannelItemSchema)).pipe(
      Effect.map(
        (channel) =>
          ({
            ...channel,
            createdAt: channel.createdAt && Dayjs(channel.createdAt),
          }) as ChannelItem,
      ),
    );

    return channel;
  });

export const getChannels = Effect.gen(function* (_) {
  const channels = yield* _(
    fetchBackendAndParse("/channel/getAll", Schema.Array(RawChannelItemSchema)),
  ).pipe(
    Effect.map((channels) =>
      channels.map((channel) => ({
        ...channel,
        createdAt: channel.createdAt && Dayjs(channel.createdAt),
      })),
    ),
  );

  return channels;
});

export const getChannelsCount = Effect.gen(function* (_) {
  const channelsCount = yield* _(fetchBackendAndParse("/channel/getCount", Schema.Number)).pipe(
    Effect.retry({ times: 3 }),
    Effect.catchAll(() => Effect.succeed(1)),
  );

  return channelsCount;
});

export const getChannelsWithYoutubeData = (
  size: number,
  page: number,
  sort: ChannelSort,
  query: string = "",
) =>
  Effect.gen(function* (_) {
    const path = `/channel/getYoutube?size=${size}&page=${page}&sort=${sort}${query !== "" ? `&query=${query}` : ""}`;
    const channelsWithYoutubeData = yield* _(fetchBackend(path));
    const channelsWithYoutubeDataJSON = yield* _(parseJSON(channelsWithYoutubeData));

    return channelsWithYoutubeDataJSON as ChannelsWithYoutubeData;
  });
