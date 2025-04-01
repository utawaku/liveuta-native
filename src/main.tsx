import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { render } from "solid-js/web";
import { routeTree } from "./routeTree.gen";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { EffectProvider } from "./components/contexts/effect-provider";
import { ThemeProvider } from "./components/contexts/theme-provider";

// import { onMount } from "solid-js";
// import { resourceDir } from "@tauri-apps/api/path";
// import { migrate } from "./lib/db/migration";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // onMount(async () => {
  //   await migrate();
  // });
  return (
    <>
      <EffectProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </EffectProvider>
    </>
  );
}

const rootElement = document.getElementById("app");
if (rootElement) {
  render(() => <App />, rootElement);
}
