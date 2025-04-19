import type { ScheduleItem } from "~/types/mongodb";
import { debounce } from "@solid-primitives/scheduled";
import { useStore } from "@tanstack/solid-store";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import { createEffect, createMemo, createSignal, For, onMount, Show } from "solid-js";
import { Temporal } from "temporal-polyfill";
import { useSettings } from "~/components/contexts/settings-provider";
import { ScheduleItemCard } from "./item-card";
import { scheduleFilteredItemsCount, scheduleFilterStore, scheduleItemCount } from "./store";

type ScheduleListProps = {
  schedule: ScheduleItem[];
};

const ITEM_MIN_WIDTH = 340;
const ITEM_MIN_HEIGHT = 340;
const ITEM_GAP = 16;
const SIDEBAR_WIDTH = 56;
const IMAGE_RATIO = 9 / 16;

export function ScheduleGrid(props: ScheduleListProps) {
  let gridRef: HTMLDivElement | undefined;

  const { settings } = useSettings();
  const filter = useStore(scheduleFilterStore);
  const filteredSchedule = createMemo(() => {
    const f = filter();
    const now = Temporal.Now.plainDateTimeISO();
    const tomorrowEnd = now.add({ days: 1 });

    const isWithin24Hours = (item: ScheduleItem) =>
      Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 0 &&
      Temporal.PlainDateTime.compare(item.scheduledTime, tomorrowEnd) <= 0;

    const isWithin24HoursLive = (item: ScheduleItem) =>
      item.broadcastStatus === true || isWithin24Hours(item);

    return props.schedule.filter((item) => {
      if (f.type === "stream") {
        if (item.isVideo) return false;

        if (f.streamType === "live") return item.type === "stream-live";
        else if (f.streamType === "scheduled") return item.type === "stream-scheduled";
        else if (f.streamType === "24h") return isWithin24HoursLive(item);
      } else if (f.type === "video") {
        if (!item.isVideo) return false;

        if (f.videoType === "video") return item.type === "video";
        else if (f.videoType === "scheduled") return item.type === "video-scheduled";
        else if (f.videoType === "24h") return isWithin24Hours(item);
      } else {
        if (f.allType === "isLive") {
          if (item.isVideo) return item.type === "video-live";
          return item.type === "stream-live";
        } else if (f.allType === "scheduled") {
          if (item.isVideo) return item.type === "video-scheduled";
          return item.type === "stream-scheduled";
        } else if (f.allType === "24h") {
          return isWithin24Hours(item) || item.type === "stream-live" || item.type === "video-live";
        }
      }

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
      estimateSize: () => itemHeight(),
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

  createEffect(() => {
    scheduleItemCount.setState(() => props.schedule.length);
    scheduleFilteredItemsCount.setState(() => filteredSchedule().length);
  });

  return (
    <div id="schedule-grid" ref={gridRef} class="pb-4">
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
                <Show
                  when={
                    rowItem.index * columnCount() + columnItem.index < filteredSchedule().length
                  }
                >
                  <ScheduleItemCard
                    item={filteredSchedule()[rowItem.index * columnCount() + columnItem.index]}
                    translateX={columnItem.start}
                    translateY={rowItem.start}
                    width={itemWidth()}
                    height={itemHeight()}
                    usePersonal={settings.personal}
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
