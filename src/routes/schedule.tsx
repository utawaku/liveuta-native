import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { useStore } from "@tanstack/solid-store";
import { Effect } from "effect";
import { Match, Suspense, Switch } from "solid-js";
import { ScheduleList } from "~/components/route-components/schedule/list";
import { getSchedule } from "~/lib/client/schedule";
import { settingsStore } from "~/lib/stores/settings";

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
    <div class="grid place-content-center">
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
              <ScheduleList schedule={schedule.data!} />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
