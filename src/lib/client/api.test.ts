import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toTemporalInstant } from "../temporal";
import {
  getChannelById,
  getChannelsCount,
  getChannelsWithYoutubeData,
  getPagedChannels,
} from "./channel";
import { getSchedule } from "./schedule";

const { http } = vi.hoisted(() => ({ http: vi.fn() }));
vi.mock("@tauri-apps/plugin-http", () => ({ fetch: http }));

const channel = {
  channelId: "UCtest",
  nameKor: "테스트",
  names: ["테스트"],
  channelAddr: "https://youtube.com/channel/UCtest",
  handleName: "@test",
  waiting: false,
  alive: true,
  profilePictureUrl: "https://example.com/avatar.jpg",
  createdAt: "2026-09-21T02:14:23.952000",
};

beforeEach(() => http.mockReset());

describe("new backend API", () => {
  it("decodes paged channels and encodes literal search queries", async () => {
    http.mockResolvedValueOnce(Response.json([channel]));
    const channels = await Effect.runPromise(
      getPagedChannels(24, 2, "name_kor", "-1", "테스트 & +#"),
    );
    expect(channels[0]?.profilePictureUrl).toBe(channel.profilePictureUrl);
    const url = new URL(http.mock.calls[0][0]);
    expect(url.pathname).toBe("/channel/getPagedChannels");
    expect(url.searchParams.get("query")).toBe("테스트 & +#");
    expect(url.searchParams.get("direction")).toBe("-1");
  });

  it("decodes YouTube contents and page totals", async () => {
    const result = {
      contents: [{ uid: "UCtest", nameKor: "테스트", url: channel.channelAddr, alive: true }],
      total: 31,
      totalPage: 2,
    };
    http.mockResolvedValueOnce(Response.json(result));
    expect(await Effect.runPromise(getChannelsWithYoutubeData(24, 1, "name_kor"))).toEqual(result);
  });

  it("accepts missing optional fields and UTC creation dates", async () => {
    http.mockResolvedValueOnce(Response.json(channel));
    expect((await Effect.runPromise(getChannelById("UCtest"))).createdAt?.toString()).toBe(
      "2026-09-21T02:14:23.952Z",
    );
    http.mockResolvedValueOnce(
      Response.json({ ...channel, createdAt: undefined, profilePictureUrl: undefined }),
    );
    expect((await Effect.runPromise(getChannelById("UCtest"))).createdAt).toBeUndefined();
    expect(toTemporalInstant("2026-09-21T11:14:23.952+09:00")?.toString()).toBe(
      "2026-09-21T02:14:23.952Z",
    );
  });

  it("converts UTC schedules to Seoul time with omitted broadcast status", async () => {
    http.mockResolvedValueOnce(
      Response.json([
        {
          title: "방송",
          channelName: "테스트",
          scheduledTime: "2030-01-01T06:15:00.000Z",
          hide: false,
          isVideo: true,
          concurrentViewers: 14,
          videoId: "video",
          channelId: "UCtest",
        },
      ]),
    );
    const schedule = await Effect.runPromise(getSchedule);
    expect(schedule[0]?.scheduledTime.toString()).toBe("2030-01-01T15:15:00");
    expect(schedule[0]?.type).toBe("video-scheduled");
  });

  it("propagates HTTP errors and rejects malformed API responses", async () => {
    http.mockResolvedValueOnce(Response.json({ message: "unavailable" }, { status: 503 }));
    await expect(Effect.runPromise(getPagedChannels(24, 1))).rejects.toThrow("HTTP 503");
    http.mockResolvedValueOnce(Response.json({ contents: [], total: "31", totalPage: 2 }));
    await expect(
      Effect.runPromise(getChannelsWithYoutubeData(24, 1, "name_kor")),
    ).rejects.toThrow();
    http.mockResolvedValue(Response.json(123));
    expect(await Effect.runPromise(getChannelsCount)).toBe(123);
  });
});
