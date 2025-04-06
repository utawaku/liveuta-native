import { createShortcut } from "@solid-primitives/keyboard";
import { useNavigate } from "@tanstack/solid-router";
import { JSX, onMount } from "solid-js";
import { useCommandPalette } from "~/components/contexts/command-palette";
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "./theme-provider";

export function ShortcutProvider(props: { children: JSX.Element }) {
  const { toggleCmd } = useCommandPalette();
  const { toggleSidebar } = useSidebar();
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  onMount(() => {
    // C: Ctrl, S: Shift, A: Alt, M: Meta
    // Commands
    // <C-k> - Open command palette
    createShortcut(["Control", "P"], toggleCmd, { preventDefault: true });
    // <C-s> - Toggle Sidebar
    createShortcut(["Control", "S"], toggleSidebar);
    // <C-S-h> - Home
    createShortcut(["Control", "Shift", "H"], () => navigate({ to: "/" }));
    // Navigate
    // <C-S-s> - Schedule
    createShortcut(["Control", "Shift", "A"], () => navigate({ to: "/schedule" }));
    // <C-S-c> - Channel
    createShortcut(["Control", "Shift", "C"], () => navigate({ to: "/channels" }));
    // Settings
    // <C-t-l> - Light theme
    createShortcut(["Control", "T", "1"], () => setTheme("light"));
    // <C-t-d> - Dark theme
    createShortcut(["Control", "T", "2"], () => setTheme("dark"));
    // <C-t-s> - System theme
    createShortcut(["Control", "T", "3"], () => setTheme("system"));
  });

  return <>{props.children}</>;
}
