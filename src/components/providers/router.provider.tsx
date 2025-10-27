import { ParentProps } from "solid-js";
import {
  createBrowserHistory,
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/solid-router";

import { routeTree } from "~/routeTree.gen";
import { useSettings } from "./settings.provider";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
  defaultViewTransition: true,
});

export function CustomRouterProvider() {
  const { settings } = useSettings();
  const history = createMemoryHistory({
    initialEntries: [settings.defaultPage],
  });

  return <RouterProvider router={router} history={history} />;
}
