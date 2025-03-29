import type { ScheduleItem } from "~/types/mongodb";
import { For } from "solid-js";
import { ScheduleItemCard } from "./item-card";

type ScheduleListProps = {
  schedule: ScheduleItem[];
};

export function ScheduleList(props: ScheduleListProps) {
  return (
    <div class="flex flex-wrap gap-4">
      <For each={props.schedule}>{(item) => <ScheduleItemCard item={item} />}</For>
    </div>
  );
}
