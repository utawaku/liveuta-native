import { Link } from "@tanstack/solid-router";
import logo from "~/assets/logo_64x64.png";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="홈" size="lg" as={Link} to="/">
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
