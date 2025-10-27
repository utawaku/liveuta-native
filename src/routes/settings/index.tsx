import { onMount } from "solid-js";
import { createFileRoute } from "@tanstack/solid-router";

import { useBreadcrumbs } from "~/components/providers/breadcrumb.provider";
import { AutoSyncSetting } from "~/components/route-components/settings/auto-sync";
import { DefaultPageSetting } from "~/components/route-components/settings/default-page";
import { SyncPeriodSetting } from "~/components/route-components/settings/sync-period";
import { ThemeSetting } from "~/components/route-components/settings/theme";
import { FieldGroup } from "~/components/ui/field";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setBreadcrumbs } = useBreadcrumbs();

  onMount(() => {
    setBreadcrumbs([
      {
        name: "설정",
        path: "/settings",
      },
    ]);
  });

  return (
    <div class="@container p-4">
      <FieldGroup class="flex flex-col">
        <ThemeSetting />
        <DefaultPageSetting />
        <AutoSyncSetting />
        <SyncPeriodSetting />
      </FieldGroup>
    </div>
  );
}
