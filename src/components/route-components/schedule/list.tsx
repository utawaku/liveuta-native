import type { ScheduleItem } from "~/lib/client/schedule";
import { For } from "solid-js";
import { ScheduleItemCard } from "./item-card";

type ScheduleListProps = {
  schedule: ScheduleItem[];
};

export function ScheduleList(props: ScheduleListProps) {
  return (
    <div class="grid grid-cols-2 gap-4">
      <For each={props.schedule}>{(item) => <ScheduleItemCard item={item} />}</For>
    </div>
  );
}
