import { Store } from "@tanstack/store";

export type ScheduleType = "all" | "stream" | "video";
export type ScheduleStreamType = "all" | "live" | "scheduled" | "24h";
export type ScheduleVideoType = "all" | "video" | "scheduled" | "24h";
export type ScheduleAllType = "all" | "isLive" | "scheduled" | "24h";

export function scheduleTypeToString(type: ScheduleType): string {
  switch (type) {
    case "all":
      return "전체";
    case "stream":
      return "방송";
    case "video":
      return "영상";
  }
}

export function scheduleStreamTypeToString(streamType: ScheduleStreamType): string {
  switch (streamType) {
    case "all":
      return "전체";
    case "live":
      return "실시간";
    case "scheduled":
      return "예정됨";
    case "24h":
      return "24시간";
  }
}

export function scheduleVideoTypeToString(videoType: ScheduleVideoType): string {
  switch (videoType) {
    case "all":
      return "전체";
    case "video":
      return "영상";
    case "scheduled":
      return "예정됨";
    case "24h":
      return "24시간";
  }
}

export function scheduleAllTypeToString(allType: ScheduleAllType): string {
  switch (allType) {
    case "all":
      return "전체";
    case "isLive":
      return "실시간";
    case "scheduled":
      return "예정됨";
    case "24h":
      return "24시간";
  }
}

export type ScheduleFilter = {
  type: ScheduleType;
  streamType: ScheduleStreamType;
  videoType: ScheduleVideoType;
  allType: ScheduleAllType;
};

function getInitialFilter(): ScheduleFilter {
  const type = (window.localStorage.getItem("schedule-filter-type") ?? "all") as ScheduleType;
  const streamType = (window.localStorage.getItem("schedule-filter-stream-type") ??
    "all") as ScheduleStreamType;
  const videoType = (window.localStorage.getItem("schedule-filter-video-type") ??
    "all") as ScheduleVideoType;
  const allType = (window.localStorage.getItem("schedule-filter-all-type") ??
    "all") as ScheduleAllType;

  return {
    type,
    streamType,
    videoType,
    allType,
  };
}

export const scheduleFilterStore = new Store<ScheduleFilter>(getInitialFilter());

export function setScheduleType(type: ScheduleType) {
  scheduleFilterStore.setState((state) => ({
    ...state,
    type,
  }));
  window.localStorage.setItem("schedule-filter-type", type);
}

export function setScheduleStreamType(streamType: ScheduleStreamType) {
  scheduleFilterStore.setState((state) => ({
    ...state,
    streamType,
  }));
  window.localStorage.setItem("schedule-filter-stream-type", streamType);
}

export function setScheduleVideoType(videoType: ScheduleVideoType) {
  scheduleFilterStore.setState((state) => ({
    ...state,
    videoType,
  }));
  window.localStorage.setItem("schedule-filter-video-type", videoType);
}

export function setScheduleAllType(allType: ScheduleAllType) {
  scheduleFilterStore.setState((state) => ({
    ...state,
    allType,
  }));
  window.localStorage.setItem("schedule-filter-all-type", allType);
}

export const scheduleItemCount = new Store(0);
export const scheduleFilteredItemsCount = new Store(0);
