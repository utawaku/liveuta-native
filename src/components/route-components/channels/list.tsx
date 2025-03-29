import type { RawChannelItem } from "~/types/mongodb";
import { For } from "solid-js";
import { YoutubeChannelData } from "~/types/youtube";
import { ChannelItemCard } from "./list-card";

type ScheduleListProps = {
  channels: YoutubeChannelData[];
};

export function ChannelList(props: ScheduleListProps) {
  return (
    <div class="grid grid-cols-2 gap-4">
      <For each={props.channels}>{(item) => <ChannelItemCard item={item} />}</For>
    </div>
  );
}
