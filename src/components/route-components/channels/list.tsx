import { For } from "solid-js";
import { YoutubeChannelData } from "~/types/youtube";
import { ChannelItemCard } from "./item-card";

type ScheduleListProps = {
  channels: YoutubeChannelData[];
};

export function ChannelList(props: ScheduleListProps) {
  return (
    <div class="@6xl:grid-cols-3 @3xl:grid-cols-2 @9xl:grid-cols-4 @12xl:grid-cols-5 @15xl:grid-cols-6 mt-24 grid grid-cols-1 gap-4 px-4">
      <For each={props.channels}>{(item) => <ChannelItemCard item={item} />}</For>
    </div>
  );
}
