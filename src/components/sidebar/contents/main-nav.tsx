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
import { TablerSettings } from "~/icons/tabler/settings";
import { MainNavItem } from "./main-nav-item";

export function MainNav() {
  const router = useRouter();
  const location = () => router.state.location;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>목차</SidebarGroupLabel>
      <SidebarMenu>
        <MainNavItem
          name="스케줄"
          tooltip="스케줄"
          path="/schedule"
          location={location()}
          icon={<RiCalendarScheduleLine />}
          shortcut="⌘+⇧+A"
        />
        <MainNavItem
          name="채널"
          tooltip="채널"
          path="/channels"
          location={location()}
          icon={<MaterialSymbolsYoutubeTvOutline />}
          shortcut="⌘+⇧+C"
        />
        <MainNavItem
          name="다운로더"
          tooltip="다운로더"
          path="/downloader"
          location={location()}
          icon={<TablerDownload />}
          disabled
        />
        <MainNavItem
          name="설정"
          tooltip="설정"
          path="/settings"
          location={location()}
          icon={<TablerSettings />}
          shortcut="⌘+⇧+S"
        />
      </SidebarMenu>
    </SidebarGroup>
  );
}
