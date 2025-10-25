import { onMount } from "solid-js";
import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { createOverlayScrollbars } from "overlayscrollbars-solid";

import { EffectProvider } from "./components/contexts/effect-provider";
import { routeTree } from "./routeTree.gen";

import "overlayscrollbars/overlayscrollbars.css";
import "./styles.css";

import { SettingsProvider } from "./components/contexts/settings-provider";
import { Toaster } from "./components/ui/sonner";

// import { resourceDir } from "@tauri-apps/api/path";
// import { migrate } from "./lib/db/migration";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  defaultViewTransition: true,
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [initialize] = createOverlayScrollbars({});
  onMount(() => {
    initialize({ target: document.body });
  });

  return (
    <>
      <EffectProvider>
        <QueryClientProvider client={new QueryClient()}>
          <SettingsProvider>
            <RouterProvider router={router} />
          </SettingsProvider>
        </QueryClientProvider>
      </EffectProvider>
      <Toaster />
    </>
  );
}

const rootElement = document.getElementById("app");
if (rootElement) {
  render(() => <App />, rootElement);
}
