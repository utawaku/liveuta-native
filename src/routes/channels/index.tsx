import type { ChannelsDirection } from "~/types/mongodb.type";

import { createResource, Match, onMount, Suspense, Switch } from "solid-js";
import { createFileRoute } from "@tanstack/solid-router";
import { useStore } from "@tanstack/solid-store";
import { Effect } from "effect";

import { useBreadcrumbs } from "~/components/providers/breadcrumb.provider";
import { ChannelsFooter } from "~/components/route-components/channels/footer";
import { ChannelsHeader } from "~/components/route-components/channels/header";
import { ChannelsHeaderSkeleton } from "~/components/route-components/channels/header-skeleton";
import { ChannelList } from "~/components/route-components/channels/list";
import { ChannelsSkeleton } from "~/components/route-components/channels/skeleton";
import {
  CHANNELS_MAX_ITEMS,
  channelsDirectionStore,
  channelsSortStore,
  pageStore,
} from "~/components/route-components/channels/store";
import { getChannelsCount, getPagedChannels } from "~/lib/client/channel";
import { ChannelSort } from "~/types/mongodb.type";

export const Route = createFileRoute("/channels/")({
  component: RouteComponent,
});

async function fetchChannelsPages() {
  return Math.ceil((await Effect.runPromise(getChannelsCount)) / CHANNELS_MAX_ITEMS);
}

async function fetchChannels(params: {
  page: number;
  sort: ChannelSort;
  direction: ChannelsDirection;
}) {
  return await Effect.runPromise(
    getPagedChannels(CHANNELS_MAX_ITEMS, params.page, params.sort, params.direction),
  );
}

function RouteComponent() {
  const { setBreadcrumbs } = useBreadcrumbs();

  const page = useStore(pageStore);
  const channelsSort = useStore(channelsSortStore);
  const channelsDirection = useStore(channelsDirectionStore);
  const fetchParams = () => ({
    page: page(),
    sort: channelsSort(),
    direction: channelsDirection(),
  });
  const [channelsPages] = createResource(fetchChannelsPages);
  const [channels] = createResource(fetchParams, fetchChannels);

  onMount(() => {
    setBreadcrumbs([
      {
        name: "채널",
        path: "/channels",
      },
    ]);
  });
  return (
    <div class="@container py-4">
      <Suspense>
        <Switch>
          <Match when={channels.loading}>
            <ChannelsHeaderSkeleton />
          </Match>
          <Match when={channels()}>
            <ChannelsHeader channelsPages={channelsPages()} />
          </Match>
        </Switch>
      </Suspense>
      <Suspense>
        <Switch>
          <Match when={channels.loading}>
            <ChannelsSkeleton />
          </Match>
          <Match when={channels.error}>
            <div>Error: {channels.error}</div>
          </Match>
          <Match when={channels()}>
            <ChannelList channels={channels()!} />
          </Match>
        </Switch>
      </Suspense>
      <Suspense>
        <Switch>
          <Match when={channelsPages.loading}>
            <div></div>
          </Match>
          <Match when={!channelsPages.loading}>
            <ChannelsFooter pages={channelsPages()!} />
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
}
