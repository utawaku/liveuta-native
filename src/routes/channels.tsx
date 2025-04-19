import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { Effect } from "effect";
import { Match, Suspense, Switch } from "solid-js";
import { useSettings } from "~/components/contexts/settings-provider";
import { ChannelList } from "~/components/route-components/channels/list";
import { getChannelsWithYoutubeData } from "~/lib/client/channel";

export const Route = createFileRoute("/channels")({
  component: RouteComponent,
});

function RouteComponent() {
  const { settings } = useSettings();
  const channel = createQuery(() => ({
    queryKey: ["channel"],
    queryFn: () => Effect.runPromise(getChannelsWithYoutubeData(10, 1, "name_kor")),
    gcTime: settings.syncPeriod * 60 * 1000,
    staleTime: settings.syncPeriod * 60 * 1000,
  }));

  return (
    <div>
      <Suspense>
        <Switch>
          <Match when={channel.isLoading}>
            <div>Loading...</div>
          </Match>
          <Match when={channel.isError}>
            <div>Error: {channel.error?.message}</div>
          </Match>
          <Match when={channel.data}>
            <ChannelList channels={channel.data!.contents} />
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
}
