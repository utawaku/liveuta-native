import { useSettings } from "~/components/providers/settings.provider";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { TablerDeviceDesktop } from "~/icons/tabler/device-desktop";
import { TablerMoon } from "~/icons/tabler/moon";
import { TablerSun } from "~/icons/tabler/sun";

export function ThemeSetting() {
  const { settings, setTheme } = useSettings();

  return (
    <Field>
      <FieldLabel>테마</FieldLabel>
      <div class="flex gap-2">
        <Button
          variant={settings.theme === "light" ? "primary" : "outline"}
          class="h-16 w-16 flex-col"
          onClick={() => setTheme("light")}
        >
          <TablerSun />
          <span>라이트</span>
        </Button>
        <Button
          variant={settings.theme === "dark" ? "primary" : "outline"}
          class="h-16 w-16 flex-col"
          onClick={() => setTheme("dark")}
        >
          <TablerMoon />
          <span>다크</span>
        </Button>
        <Button
          variant={settings.theme === "system" ? "primary" : "outline"}
          class="h-16 w-16 flex-col"
          onClick={() => setTheme("system")}
        >
          <TablerDeviceDesktop />
          <span>시스템</span>
        </Button>
      </div>
    </Field>
  );
}
