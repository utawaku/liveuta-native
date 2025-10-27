import type { ParsedLocation } from "@tanstack/solid-router";
import type { Route } from "~/types/route-info.type";

import { JSX } from "solid-js";
import { Link } from "@tanstack/solid-router";

import {
  SidebarMenuButton,
  SidebarMenuButtonInnerWithShortcut,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

type MainNavItemProps = {
  name: string;
  tooltip: string;
  path: Route;
  location: ParsedLocation;
  icon: JSX.Element;
  shortcut?: string;
  disabled?: boolean;
};

export function MainNavItem(props: MainNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={props.tooltip}
        as={Link}
        to={props.path}
        variant={props.location.pathname.startsWith(props.path) ? "invert" : "default"}
        disabled={props.disabled}
      >
        <div class="mr-1 [&_svg]:size-4">{props.icon}</div>
        <SidebarMenuButtonInnerWithShortcut shortcut={props.shortcut}>
          <span>{props.name}</span>
        </SidebarMenuButtonInnerWithShortcut>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
