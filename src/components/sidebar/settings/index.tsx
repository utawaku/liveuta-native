import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "../../ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export function Settings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>설정</SidebarGroupLabel>
      <SidebarGroupContent>
        <ThemeToggle />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
