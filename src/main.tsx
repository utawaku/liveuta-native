import { onMount } from "solid-js";
import { render } from "solid-js/web";
import { createOverlayScrollbars } from "overlayscrollbars-solid";

import { EffectProvider } from "./components/providers/effect,provider";

import "overlayscrollbars/overlayscrollbars.css";
import "./styles.css";

import { QueryProvider } from "./components/providers/query-provider";
import { CustomRouterProvider, router } from "./components/providers/router.provider";
import { SettingsProvider } from "./components/providers/settings.provider";
import { Toaster } from "./components/ui/sonner";


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
