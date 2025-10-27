import { useCommandPalette } from "~/components/providers/command-palette.provider";
import {
  SidebarMenuButton,
  SidebarMenuButtonInnerWithShortcut,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

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
        <SidebarMenuButtonInnerWithShortcut shortcut="⌘+P">
          <span>커맨드 팔레트 {isCmdOpen() ? "닫기" : "열기"}</span>
        </SidebarMenuButtonInnerWithShortcut>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
