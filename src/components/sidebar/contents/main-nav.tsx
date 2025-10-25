import { Link, useRouter } from "@tanstack/solid-router";

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
import { TablerDownload } from "~/icons/tabler/download";

export function MainNav() {
  const router = useRouter();
  const location = () => router.state.location;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>목차</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="스케줄"
            as={Link}
            to="/schedule"
            variant={location().pathname.startsWith("/schedule") ? "invert" : "default"}
          >
            <RiCalendarScheduleLine class="mr-1 size-6" />
            <SidebarMenuButtonInnerWithShortcut shortcut="⌘+⇧+A">
              <span>스케줄</span>
            </SidebarMenuButtonInnerWithShortcut>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="채널"
            as={Link}
            to="/channels"
            variant={location().pathname.startsWith("/channels") ? "invert" : "default"}
          >
            <MaterialSymbolsYoutubeTvOutline class="mr-1 size-6" />
            <SidebarMenuButtonInnerWithShortcut shortcut="⌘+⇧+C">
              <span>채널</span>
            </SidebarMenuButtonInnerWithShortcut>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="다운로더"
            as={Link}
            to="/downloader"
            variant={location().pathname.startsWith("/downloader") ? "invert" : "default"}
          >
            <TablerDownload class="mr-1 size-6" />
            <SidebarMenuButtonInnerWithShortcut shortcut="⌘+⇧+D">
              <span>다운로더</span>
            </SidebarMenuButtonInnerWithShortcut>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
