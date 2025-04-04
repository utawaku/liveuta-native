import { useStore } from "@tanstack/solid-store";
import { filterStore } from "./store";

export function ScheduleFilter() {
  const filter = useStore(filterStore);

  return (
    <div>
      <span>Time: {filter().time}</span>
      <span>Type: {filter().type}</span>
      <span>StreamType: {filter().streamType}</span>
      <span>VideoType: {filter().videoType}</span>
    </div>
  );
}
