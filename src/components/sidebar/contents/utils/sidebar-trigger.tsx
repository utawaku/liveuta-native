import {
  SidebarMenuButton,
  SidebarMenuButtonInnerWithShortcut,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";

export function SidebarTrigger() {
  const { state, toggleSidebar } = useSidebar();
  const expanded = () => state() === "expanded";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={expanded() ? "사이드바 접기" : "사이드바 열기"}
        data-sidebar="trigger"
        onClick={() => toggleSidebar()}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
        <SidebarMenuButtonInnerWithShortcut shortcut="⌘+S">
          <span>사이드바 {expanded() ? "접기" : "열기"}</span>
        </SidebarMenuButtonInnerWithShortcut>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
