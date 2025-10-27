import { Match, onMount, Suspense, Switch } from "solid-js";
import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { Effect } from "effect";

import { useBreadcrumbs } from "~/components/providers/breadcrumb.provider";
import { useSettings } from "~/components/providers/settings.provider";
import { ScheduleGrid } from "~/components/route-components/schedule/grid";
import { ScheduleHeader } from "~/components/route-components/schedule/header";
import { ScheduleSkeleton } from "~/components/route-components/schedule/skeleton";
import { getSchedule } from "~/lib/client/schedule";

export const Route = createFileRoute("/schedule/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const { settings } = useSettings();
  const schedule = useQuery(() => ({
    queryKey: ["schedule"],
    queryFn: () => Effect.runPromise(getSchedule),
    gcTime: settings.syncPeriod * 60 * 1000,
    staleTime: settings.syncPeriod * 60 * 1000,
  }));

  onMount(() => {
    setBreadcrumbs([
      {
        name: "스케줄",
        path: "/schedule",
      },
    ]);
  });

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
