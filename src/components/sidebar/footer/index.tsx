import { SidebarFooter, SidebarMenu } from "~/components/ui/sidebar";
import { PipMinimized } from "./pip-minimized";
import { ScrollToTop } from "./scroll-to-top";

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <PipMinimized />
        <ScrollToTop />
      </SidebarMenu>
    </SidebarFooter>
  );
}
