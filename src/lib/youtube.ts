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
