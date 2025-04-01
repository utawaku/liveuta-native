import { SidebarContent } from "~/components/ui/sidebar";
import { MainNav } from "./main-nav";
import { Settings } from "./settings";
import { SidebarUtils } from "./utils";

export function AppSidebarContents() {
  return (
    <SidebarContent>
      <SidebarUtils />
      <Settings />
      <MainNav />
    </SidebarContent>
  );
}
