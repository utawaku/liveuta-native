import { Store } from "@tanstack/store";

export type TimeFilter = "all" | "today" | "tomorrow" | "todayAndTomorrow" | "24h";
export type TypeFilter = "all" | "stream" | "video";
export type StreamType = "all" | "live" | "ended" | "scheduled" | "liveAndScheduled";
export type VideoType = "all" | "video" | "scheduled";

export type ScheduleFilter = {
  time: TimeFilter;
  type: TypeFilter;
  streamType: StreamType;
  videoType: VideoType;
};

function getDefaultFilter(): ScheduleFilter {
  const time = (window.localStorage.getItem("schedule-filter-time") ?? "all") as TimeFilter;
  const type = (window.localStorage.getItem("schedule-filter-type") ?? "all") as TypeFilter;
  const streamType = (window.localStorage.getItem("schedule-filter-stream-type") ??
    "all") as StreamType;
  const videoType = (window.localStorage.getItem("schedule-filter-video-type") ??
    "all") as VideoType;

  return {
    time,
    type,
    streamType,
    videoType,
  };
}

function setFilterToStorage(filter: ScheduleFilter) {
  window.localStorage.setItem("schedule-filter-time", filter.time);
  window.localStorage.setItem("schedule-filter-type", filter.type);
  window.localStorage.setItem("schedule-filter-stream-type", filter.streamType);
  window.localStorage.setItem("schedule-filter-video-type", filter.videoType);
}

export const filterStore = new Store<ScheduleFilter>(getDefaultFilter(), {
  onUpdate: () => {
    setFilterToStorage(filterStore.state);
  },
});
