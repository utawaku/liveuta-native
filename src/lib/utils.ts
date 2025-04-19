import type { Theme } from "~/types/settings";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function themeToLabel(theme: Theme) {
  switch (theme) {
    case "light":
      return "라이트";
    case "dark":
      return "다크";
    case "system":
      return "시스템";
  }
}

export type YoutubeThumbnailQuality = "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";

export function youtubeThumbnailUrl(
  videoId: string,
  quality: YoutubeThumbnailQuality = "mqdefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
export function youtubeChannelUrl(channelId: string) {
  return `https://www.youtube.com/channel/${channelId}`;
}
export function youtubeLivestreamUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
export function youtubeVideoUrl(videoId: string) {
  return `https://youtu.be/${videoId}`;
}
export function youtubePlaylistUrl(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}
