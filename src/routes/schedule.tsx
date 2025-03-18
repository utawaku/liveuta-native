import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/schedule")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div class="grid place-content-center">Hello "/schedule"!</div>;
}
