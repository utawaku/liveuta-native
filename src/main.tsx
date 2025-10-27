import { onMount } from "solid-js";
import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { createOverlayScrollbars } from "overlayscrollbars-solid";

import { EffectProvider } from "./components/providers/effect,provider";
import { routeTree } from "./routeTree.gen";

import "overlayscrollbars/overlayscrollbars.css";
import "./styles.css";

import { QueryProvider } from "./components/providers/query-provider";
import { CustomRouterProvider, router } from "./components/providers/router.provider";
import { SettingsProvider } from "./components/providers/settings.provider";
import { Toaster } from "./components/ui/sonner";

// import { resourceDir } from "@tauri-apps/api/path";
// import { migrate } from "./lib/db/migration";

// const router = createRouter({
//   routeTree,
//   defaultPreload: "intent",
//   scrollRestoration: true,
//   defaultPreloadStaleTime: 0,
//   defaultViewTransition: true,
// });

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
        <SettingsProvider>
          <QueryProvider>
            {/* <RouterProvider router={router} /> */}
            <CustomRouterProvider />
          </QueryProvider>
        </SettingsProvider>
      </EffectProvider>
      <Toaster />
    </>
  );
}

const rootElement = document.getElementById("app");
if (rootElement) {
  render(() => <App />, rootElement);
}
