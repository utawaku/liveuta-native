import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export function Settings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>설정</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <ThemeToggle />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
