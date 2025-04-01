import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "~/components/ui/sidebar";
import { SidebarTrigger } from "./sidebar-trigger";

export function SidebarUtils() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
