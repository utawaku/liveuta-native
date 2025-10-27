import { RegisteredRouter } from "@tanstack/solid-router";

export type Route = keyof RegisteredRouter["routesByPath"];

export type RouteInfo = {
  path: Route;
  name: string;
};
