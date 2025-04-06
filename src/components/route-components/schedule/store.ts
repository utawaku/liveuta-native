import { Derived, Store } from "@tanstack/store";
import { Temporal } from "temporal-polyfill";

export type ScheduleType = "all" | "stream" | "video";
export type ScheduleTime = "all" | "today" | "tomorrow" | "todayAndTomorrow" | "custom";
export type ScheduleStreamType = "all" | "live" | "scheduled";
export type ScheduleVideoType = "all" | "video" | "scheduled";

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

export function scheduleTimeToString(time: ScheduleTime): string {
  switch (time) {
    case "all":
      return "전체";
    case "today":
      return "오늘";
    case "tomorrow":
      return "내일";
    case "todayAndTomorrow":
      return "오늘+내일";
    case "custom":
      return "24시간";
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
  }
}

export type ScheduleFilter = {
  type: ScheduleType;
  time: ScheduleTime;
  streamType: ScheduleStreamType;
  videoType: ScheduleVideoType;
};

function getInitialFilter(): ScheduleFilter {
  const type = (window.localStorage.getItem("schedule-filter-type") ?? "all") as ScheduleType;
  const time = (window.localStorage.getItem("schedule-filter-time") ?? "all") as ScheduleTime;
  const streamType = (window.localStorage.getItem("schedule-filter-stream-type") ??
    "all") as ScheduleStreamType;
  const videoType = (window.localStorage.getItem("schedule-filter-video-type") ??
    "all") as ScheduleVideoType;

  return {
    type,
    time,
    streamType,
    videoType,
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

export function setScheduleTime(time: ScheduleTime) {
  scheduleFilterStore.setState((state) => ({
    ...state,
    time,
  }));
  window.localStorage.setItem("schedule-filter-time", time);
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

type ScheduleCustomTime = {
  start: Temporal.PlainDateTime;
  end: Temporal.PlainDateTime;
};

export const scheduleTimeStore = new Store<ScheduleCustomTime>({
  start: Temporal.Now.plainDateTimeISO().round("minute"),
  end: Temporal.Now.plainDateTimeISO().add({ days: 1 }).round("minute"),
});

export const scheduleTimeStringStore = new Derived({
  fn: () => ({
    start: scheduleTimeStore.state.start.toString(),
    end: scheduleTimeStore.state.end.toString(),
  }),
  deps: [scheduleTimeStore],
});

export function setScheduleTimeStart(start: Temporal.PlainDateTime) {
  scheduleTimeStore.setState((state) => ({
    ...state,
    start,
  }));
}

export function setScheduleTimeEnd(end: Temporal.PlainDateTime) {
  scheduleTimeStore.setState((state) => ({
    ...state,
    end,
  }));
}
