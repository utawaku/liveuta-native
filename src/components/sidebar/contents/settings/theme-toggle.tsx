import { useSettings } from "~/components/contexts/settings-provider";
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

export function ThemeToggle() {
  const { settings, setTheme } = useSettings();

  return (
    <SidebarMenuItem>
      <DropdownMenu placement="right-start">
        <DropdownMenuTrigger as={SidebarMenuButton} tooltip="테마 변경">
          <TablerSun class="size-6 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <TablerMoon class="absolute size-6 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
          <span class="ml-1">{themeToLabel(settings.theme)}</span>
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
