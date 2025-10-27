import { onMount } from "solid-js";
import { createFileRoute } from "@tanstack/solid-router";

import { useBreadcrumbs } from "~/components/providers/breadcrumb.provider";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { setBreadcrumbs } = useBreadcrumbs();

  onMount(() => {
    setBreadcrumbs([]);
  });

  return (
    <div class="grid min-h-[calc(100svh-4rem)] place-content-center md:min-h-[calc(100svh-3rem)]">
      <div>
        <h1 class="mb-header inline-block bg-linear-to-r from-primary/80 via-primary to-secondary bg-clip-text text-center text-5xl/[3rem] font-bold text-transparent md:text-7xl/[5rem]">
          <span class="">
            Liveuta <span>Native</span>
          </span>
        </h1>
      </div>
    </div>
  );
}
