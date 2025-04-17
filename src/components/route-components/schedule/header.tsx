import { useStore } from "@tanstack/solid-store";
import { useSidebar } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { ScheduleFilter } from "./filter";
import { scheduleFilteredItemsCount, scheduleItemCount } from "./store";

export function ScheduleHeader() {
  const itemCount = useStore(scheduleItemCount);
  const filteredItemsCount = useStore(scheduleFilteredItemsCount);

  return (
    <div
      class={cn(
        "ease-expo-in-out-custom fixed z-50 mt-2 flex w-full items-center justify-between px-4 transition-[width] duration-200 md:w-[calc(100%-var(--sidebar-width-icon))] md:group-has-[[data-state=expanded]]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width))]",
      )}
    >
      <ScheduleFilter />
      <div class="bg-background text-foreground hover:bg-background/80 flex h-10 items-center gap-1 rounded-md border px-4 py-2 text-lg shadow">
        <span>{filteredItemsCount()}</span>
        <span>/</span>
        <span>{itemCount()}</span>
      </div>
    </div>
  );
}
