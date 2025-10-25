import { Match, Suspense, Switch } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { Effect } from "effect";

import { useSettings } from "~/components/contexts/settings-provider";
import { ScheduleGrid } from "~/components/route-components/schedule/grid";
import { ScheduleHeader } from "~/components/route-components/schedule/header";
import { ScheduleSkeleton } from "~/components/route-components/schedule/skeleton";
import { getSchedule } from "~/lib/client/schedule";

export const Route = createFileRoute("/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  const { settings } = useSettings();
  const schedule = createQuery(() => ({
    queryKey: ["schedule"],
    queryFn: () => Effect.runPromise(getSchedule),
    gcTime: settings.syncPeriod * 60 * 1000,
    staleTime: settings.syncPeriod * 60 * 1000,
  }));

  return (
    <div class="@container">
      <ScheduleHeader />
      <div class="px-4 pt-16">
        <Suspense>
          <Switch>
            <Match when={schedule.isLoading}>
              <ScheduleSkeleton />
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
