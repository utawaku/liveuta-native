import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { useStore } from "@tanstack/solid-store";
import { Effect } from "effect";
import { Match, Suspense, Switch } from "solid-js";
import { ScheduleFilter } from "~/components/route-components/schedule/filter";
import { ScheduleGrid } from "~/components/route-components/schedule/grid";
import { scheduleFilterStore } from "~/components/route-components/schedule/store";
import { getSchedule } from "~/lib/client/schedule";
import { settingsStore } from "~/stores/settings";

export const Route = createFileRoute("/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  const settings = useStore(settingsStore);
  const schedule = createQuery(() => ({
    queryKey: ["schedule"],
    queryFn: () => Effect.runPromise(getSchedule),
    gcTime: settings().syncPeriod * 60 * 1000,
    staleTime: settings().syncPeriod * 60 * 1000,
  }));

  return (
    <div class="px-4">
      <div>
        <ScheduleFilter />
      </div>
      <div>
        <Suspense>
          <Switch>
            <Match when={schedule.isLoading}>
              <div>Loading...</div>
            </Match>
            <Match when={schedule.isError}>
              <div>Error: {schedule.error?.message}</div>
            </Match>
            <Match when={schedule.data}>
              <ScheduleGrid schedule={schedule.data!} />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
