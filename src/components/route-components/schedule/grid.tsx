import type { ScheduleItem } from "~/types/mongodb";
import { createWindowVirtualizer } from "@tanstack/solid-virtual";
import { createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { ScheduleItemCard } from "./item-card";

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
    count: props.schedule.length,
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
        <For each={grid.getVirtualItems()}>
          {(item) => (
            <ScheduleItemCard
              item={props.schedule[item.index]}
              translateX={(item.index % columnCount()) * (itemWidth() + ITEM_GAP)}
              translateY={Math.floor(item.index / columnCount()) * (itemHeight() + ITEM_GAP)}
              width={itemWidth()}
              height={itemHeight()}
            />
          )}
        </For>
      </div>
    </div>
  );
}
