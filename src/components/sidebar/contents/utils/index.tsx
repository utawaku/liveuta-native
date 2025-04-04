import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "~/components/ui/sidebar";
import { SidebarCommandPaletteButton } from "./sidebar-command-palette-button";
import { SidebarTrigger } from "./sidebar-trigger";

export function SidebarUtils() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarTrigger />
          <SidebarCommandPaletteButton />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
