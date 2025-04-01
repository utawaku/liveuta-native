import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { TablerDeviceDesktop } from "~/icons/tabler/device-desktop";
import { TablerMoon } from "~/icons/tabler/moon";
import { TablerSun } from "~/icons/tabler/sun";
import { themeToLabel } from "~/lib/utils";
import { useTheme } from "../../../contexts/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <DropdownMenu preventScroll={false} placement="right-start">
        <DropdownMenuTrigger as={SidebarMenuButton} tooltip="테마 변경">
          <TablerSun class="size-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <TablerMoon class="absolute size-6 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span class="ml-1">{themeToLabel(theme())}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setTheme("light")}>
            <TablerSun class="mr-2 size-4" />
            <span>라이트</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setTheme("dark")}>
            <TablerMoon class="mr-2 size-4" />
            <span>다크</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setTheme("system")}>
            <TablerDeviceDesktop class="mr-2 size-4" />
            <span>시스템</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
