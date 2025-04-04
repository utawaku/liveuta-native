import { useCommandPalette } from "~/components/contexts/command-palette";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";

export function SidebarCommandPaletteButton() {
  const { toggleCmd, isCmdOpen } = useCommandPalette();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={isCmdOpen() ? "커맨드 팔레트 닫기" : "커맨드 팔레트 열기"}
        data-sidebar="trigger"
        onClick={() => toggleCmd()}
      >
        <span class="text-base">⌘</span>
        <span>커맨드 팔레트 {isCmdOpen() ? "닫기" : "열기"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
