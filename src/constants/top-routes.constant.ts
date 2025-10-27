import { Route, RouteInfo } from "~/types/route-info.type";

export const topRoutes: RouteInfo[] = [
  {
    path: "/",
    name: "홈",
  },
  {
    path: "/schedule",
    name: "스케줄",
  },
  {
    path: "/channels",
    name: "채널",
  },
  {
    path: "/settings",
    name: "설정",
  },
] as const;

export function getTopRouteName(path: Route) {
  for (let i = 0; i < topRoutes.length; ++i) {
    if (topRoutes[i].path === path) {
      return topRoutes[i].name;
    }
  }

  return "";
}
