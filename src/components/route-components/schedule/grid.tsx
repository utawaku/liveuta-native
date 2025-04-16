import type { ScheduleItem } from "~/types/mongodb";
import { debounce } from "@solid-primitives/scheduled";
import { useStore } from "@tanstack/solid-store";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import { Temporal } from "temporal-polyfill";
import { ScheduleItemCard } from "./item-card";
import { scheduleFilterStore } from "./store";

type ScheduleListProps = {
  schedule: ScheduleItem[];
};

const ITEM_MIN_WIDTH = 340;
const ITEM_MIN_HEIGHT = 350;
const ITEM_GAP = 16;
const SIDEBAR_WIDTH = 56;
const IMAGE_RATIO = 9 / 16;

export function ScheduleGrid(props: ScheduleListProps) {
  let gridRef: HTMLDivElement | undefined;

  const filter = useStore(scheduleFilterStore);
  const filteredSchedule = createMemo(() => {
    const f = filter();
    const now = Temporal.Now.plainDateTimeISO();
    const todayStart = now.with({ hour: 0, minute: 0, second: 0 });
    const tomorrowEnd = now.add({ days: 1 });

    // Helper functions for filtering
    const isLiveStream = (item: ScheduleItem) =>
      item.broadcastStatus === true ||
      (Temporal.PlainDateTime.compare(item.scheduledTime, todayStart) >= 0 &&
        Temporal.PlainDateTime.compare(item.scheduledTime, now) <= 0 &&
        item.scheduledTime.hour === now.hour);

    const isScheduledStream = (item: ScheduleItem) =>
      item.broadcastStatus === false &&
      Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 0;

    const isWithin24Hours = (item: ScheduleItem) =>
      Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 0 &&
      Temporal.PlainDateTime.compare(item.scheduledTime, tomorrowEnd) <= 0;

    const isWithin24HoursLive = (item: ScheduleItem) =>
      item.broadcastStatus === true || isWithin24Hours(item);

    const isLiveVideo = (item: ScheduleItem) =>
      Temporal.PlainDateTime.compare(item.scheduledTime, todayStart) >= 0 &&
      Temporal.PlainDateTime.compare(item.scheduledTime, now) <= 0;

    const isScheduledVideo = (item: ScheduleItem) =>
      Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 1;

    return props.schedule.filter((item) => {
      if (f.type === "stream") {
        if (item.isVideo) return false;

        if (f.streamType === "live") return isLiveStream(item);
        else if (f.streamType === "scheduled") return isScheduledStream(item);
        else if (f.streamType === "24h") return isWithin24HoursLive(item);
      } else if (f.type === "video") {
        if (!item.isVideo) return false;

        if (f.videoType === "video") return isLiveVideo(item);
        else if (f.videoType === "scheduled") return isScheduledVideo(item);
        else if (f.videoType === "24h") return isWithin24Hours(item);
      }

      if (f.allType === "isLive") {
        if (item.isVideo) return isLiveVideo(item);
        return isLiveStream(item);
      } else if (f.allType === "scheduled") {
        if (item.isVideo) return isScheduledVideo(item);
        return isScheduledStream(item);
      } else if (f.allType === "24h") return isWithin24HoursLive(item);

      return true; // Default case
    });
  });
  const [_, setResizeObserver] = createSignal<ResizeObserver | null>(null);
  const [containerWidth, setContainerWidth] = createSignal(window.innerWidth - SIDEBAR_WIDTH);
  const containerWidthDebounced = debounce(setContainerWidth, 50);
  const columnCount = createMemo(() => {
    return Math.floor((containerWidth() + ITEM_GAP) / (ITEM_MIN_WIDTH + ITEM_GAP));
  });
  const itemWidth = createMemo(
    () => (containerWidth() - (columnCount() - 1) * ITEM_GAP) / columnCount(),
  );
  const itemHeight = createMemo(
    () => ITEM_MIN_HEIGHT + (itemWidth() - ITEM_MIN_WIDTH - ITEM_GAP * 2) * IMAGE_RATIO,
  );

  const column = () =>
    createWindowVirtualizer({
      horizontal: true,
      count: columnCount(),
      estimateSize: itemWidth,
      overscan: 10,
      gap: ITEM_GAP,
    });

  const row = () =>
    createWindowVirtualizer({
      count: Math.ceil(filteredSchedule().length / columnCount()),
      estimateSize: () => itemHeight() + ITEM_GAP,
      overscan: 10,
      gap: ITEM_GAP,
    });

  const totalHeight = createMemo(() => row().getTotalSize());
  const rowItems = createMemo(() => row().getVirtualItems());

  onMount(() => {
    const observer = new ResizeObserver(() => {
      containerWidthDebounced(gridRef!.clientWidth);
    });
    observer.observe(gridRef!);

    setResizeObserver(observer);
  });

  return (
    <div id="schedule-grid" ref={gridRef}>
      <div
        class="relative w-full"
        style={{
          height: `${totalHeight()}px`,
        }}
      >
        <For each={rowItems()}>
          {(rowItem) => (
            <For each={column().getVirtualItems()}>
              {(columnItem) => (
                <Show when={filteredSchedule()[rowItem.index * columnCount() + columnItem.index]}>
                  <ScheduleItemCard
                    item={filteredSchedule()[rowItem.index * columnCount() + columnItem.index]}
                    translateX={columnItem.start}
                    translateY={rowItem.start}
                    width={itemWidth()}
                    height={itemHeight()}
                  />
                </Show>
              )}
            </For>
          )}
        </For>
      </div>
    </div>
  );
}
