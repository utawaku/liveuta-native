import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main class="">
      <div>Hello, world!</div>
      <div>안녕하세요!</div>
    </main>
  );
}
