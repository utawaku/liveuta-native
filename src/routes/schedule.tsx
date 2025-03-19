import { createFileRoute } from "@tanstack/solid-router";
import { Effect } from "effect";
import { createResource, For, Match, Show, Suspense, Switch } from "solid-js";
import { getSchedule } from "~/lib/client/schedule";

export const Route = createFileRoute("/schedule")({
  component: RouteComponent,
});

async function fetchSchedule() {
  return await Effect.runPromise(getSchedule);
  // return 1;
}

function RouteComponent() {
  const [schedule] = createResource(fetchSchedule);

  return (
    <div class="grid place-content-center">
      <div>
        <Suspense>
          <Show when={schedule.loading}>
            <div>Loading...</div>
          </Show>
          <Switch>
            <Match when={schedule.error}>
              <span>Error: {schedule.error}</span>
            </Match>
            <Match when={schedule()}>
              <div>
                <For each={schedule()?.liveStreams}>
                  {(item) => (
                    <div>
                      <div>{item.title}</div>
                    </div>
                  )}
                </For>
                <For each={schedule()?.endedLiveStreams}>
                  {(item) => (
                    <div>
                      <div>{item.title}</div>
                    </div>
                  )}
                </For>
                <For each={schedule()?.scheduledLiveStreams}>
                  {(item) => (
                    <div>
                      <div>{item.title}</div>
                    </div>
                  )}
                </For>
                <For each={schedule()?.videos}>
                  {(item) => (
                    <div>
                      <div>{item.title}</div>
                    </div>
                  )}
                </For>
                <For each={schedule()?.scheduledVideos}>
                  {(item) => (
                    <div>
                      <div>{item.title}</div>
                    </div>
                  )}
                </For>
              </div>
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
