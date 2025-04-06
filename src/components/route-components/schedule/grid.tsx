import type { ScheduleItem } from "~/types/mongodb";
import { useStore } from "@tanstack/solid-store";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import { createMemo, createSignal, For, Index, onCleanup, onMount } from "solid-js";
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
  const filteredSchedule = () => {
    const f = filter();
    const now = Temporal.Now.plainDateTimeISO();

    return props.schedule.filter((item) => {
      if (f.type === "stream") {
        if (item.isVideo) {
          return false;
        }

        if (f.streamType === "live") {
          return item.broadcastStatus;
        } else if (f.streamType === "scheduled") {
          return !item.broadcastStatus;
        }
      } else if (f.type === "video") {
        if (!item.isVideo) {
          return false;
        }

        if (f.videoType === "video") {
          return Temporal.PlainDateTime.compare(item.scheduledTime, now) < 0;
        } else if (f.videoType === "scheduled") {
          return Temporal.PlainDateTime.compare(item.scheduledTime, now) >= 0;
        }
      }

      return true;
    });
  };
  const [_, setResizeObserver] = createSignal<ResizeObserver | null>(null);
  const [containerWidth, setContainerWidth] = createSignal(window.innerWidth - SIDEBAR_WIDTH);
  const columnCount = createMemo(() => {
    return Math.floor((containerWidth() + ITEM_GAP) / (ITEM_MIN_WIDTH + ITEM_GAP));
  });
  const itemWidth = createMemo(
    () => (containerWidth() - (columnCount() - 1) * ITEM_GAP) / columnCount(),
  );
  const itemHeight = createMemo(
    () => ITEM_MIN_HEIGHT + (itemWidth() - ITEM_MIN_WIDTH - ITEM_GAP * 2) * IMAGE_RATIO,
  );

  const grid = createWindowVirtualizer({
    count: filteredSchedule().length,
    estimateSize: () => (itemHeight() + ITEM_GAP) / columnCount(),
    overscan: 10,
  });

  onMount(() => {
    const observer = new ResizeObserver(() => {
      setContainerWidth(gridRef!.clientWidth);
    });
    observer.observe(gridRef!);

    setResizeObserver(observer);
  });

  onCleanup(() => {});

  return (
    <div id="schedule-grid" ref={gridRef}>
      <div
        class="relative w-full"
        style={{
          height: `${grid.getTotalSize()}px`,
        }}
      >
        <Index each={grid.getVirtualItems()}>
          {(item) => (
            <ScheduleItemCard
              item={filteredSchedule()[item().index]}
              translateX={(item().index % columnCount()) * (itemWidth() + ITEM_GAP)}
              translateY={Math.floor(item().index / columnCount()) * (itemHeight() + ITEM_GAP)}
              width={itemWidth()}
              height={itemHeight()}
            />
          )}
        </Index>
      </div>
    </div>
  );
}
