import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/channel")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/channel"!</div>;
}
