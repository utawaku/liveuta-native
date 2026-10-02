import type { FileRoutesByTo } from "~/routeTree.gen";

export type Route = keyof FileRoutesByTo;

export type RouteInfo = {
  path: Route;
  name: string;
};
