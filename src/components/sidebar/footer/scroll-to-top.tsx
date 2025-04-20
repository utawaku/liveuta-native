import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { TablerArrowBigUpLinesFilled } from "~/icons/tabler/arrow-big-up-lines.filled";

export function ScrollToTop() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip="맨 위로"
        onClick={() =>
          window.scrollTo({
            behavior: "auto",
            top: 0,
          })
        }
      >
        <TablerArrowBigUpLinesFilled class="h-4 w-4" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
