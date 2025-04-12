import { Link } from "@tanstack/solid-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuButtonInnerWithShortcut,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { MaterialSymbolsYoutubeTvOutline } from "~/icons/material-symbols/youtube-tv-outline";
import { RiCalendarScheduleLine } from "~/icons/remix-icon/calendar-schedule-line";

export function MainNav() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>목차</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="스케줄" as={Link} to="/schedule">
            <RiCalendarScheduleLine class="mr-1 size-6" />
            <SidebarMenuButtonInnerWithShortcut shortcut="⌘+⇧+A">
              <span>스케줄</span>
            </SidebarMenuButtonInnerWithShortcut>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="채널" as={Link} to="/channels">
            <MaterialSymbolsYoutubeTvOutline class="mr-1 size-6" />
            <SidebarMenuButtonInnerWithShortcut shortcut="⌘+⇧+C">
              <span>채널</span>
            </SidebarMenuButtonInnerWithShortcut>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
