import { Link } from "@tanstack/solid-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
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
            <span>스케줄</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="채널" as={Link} to="/channels">
            <MaterialSymbolsYoutubeTvOutline class="mr-1 size-6" />
            <span>채널</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
