import { Link } from "@tanstack/solid-router";
import logo from "~/assets/logo_64x64.png";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { MainNav } from "./main-nav";
import { Settings } from "./settings";

function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" as={Link} to="/">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src={logo} alt="liveuta logo" class="size-8" />
          </div>
          <div class="grid flex-1 text-left leading-tight">
            <span class="truncate text-xl font-semibold">Liveuta</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <Settings />
        <MainNav />
      </SidebarContent>
    </Sidebar>
  );
}
