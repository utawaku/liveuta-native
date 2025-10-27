import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/downloader/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/downloader/"!</div>;
}
