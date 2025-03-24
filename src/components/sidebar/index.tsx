import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "~/components/ui/sidebar";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { Settings } from "./settings";
import { SidebarUtils } from "./utils";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarUtils />
        <Settings />
        <MainNav />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
