import { useStore } from "@tanstack/solid-store";

import { cn } from "~/lib/utils";
import { ScheduleFilter } from "./filter";
import { scheduleFilteredItemsCount, scheduleItemCount } from "./store";

export function ScheduleHeader() {
  const itemCount = useStore(scheduleItemCount);
  const filteredItemsCount = useStore(scheduleFilteredItemsCount);

  return (
    <div
      class={cn(
        "fixed z-50 mt-2 flex w-full items-center justify-between px-4 transition-[width] duration-200 ease-expo-in-out-custom md:w-[calc(100%-var(--sidebar-width-icon))] md:group-has-data-[state=expanded]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width))]",
      )}
    >
      <ScheduleFilter />
      <div class="flex h-10 items-center gap-1 rounded-md border bg-background px-4 py-2 text-lg text-foreground shadow hover:bg-background/80">
        <span>{filteredItemsCount()}</span>
        <span>/</span>
        <span>{itemCount()}</span>
      </div>
    </div>
  );
}
