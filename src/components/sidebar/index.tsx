import { Sidebar, SidebarRail } from "~/components/ui/sidebar";
import { AppSidebarContents } from "./contents";
import { AppSidebarFooter } from "./footer";
import { AppSidebarHeader } from "./header";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" id="sidebar">
      <AppSidebarHeader />
      <AppSidebarContents />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
