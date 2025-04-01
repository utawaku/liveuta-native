import { TablerArrowBigUpLinesFilled } from "~/icons/tabler/arrow-big-up-lines.filled";
import { SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";

export function ScrollToTop() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip="맨 위로"
        onClick={() =>
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          })
        }
      >
        <TablerArrowBigUpLinesFilled class="h-4 w-4" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
