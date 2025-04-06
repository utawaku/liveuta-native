import { createRootRouteWithContext, Outlet } from "@tanstack/solid-router";
import { CommandPaletteProvider } from "~/components/contexts/command-palette";
import { ShortcutProvider } from "~/components/contexts/global-shortcut-provider";
import { YoutubePipProvider } from "~/components/contexts/youtube-pip-provider";
import { Navbar } from "~/components/navbar";
import { AppSidebar } from "~/components/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <YoutubePipProvider>
      <SidebarProvider>
        <CommandPaletteProvider>
          <ShortcutProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              <Outlet />
              {/* <TanStackRouterDevtools /> */}
            </SidebarInset>
          </ShortcutProvider>
        </CommandPaletteProvider>
      </SidebarProvider>
    </YoutubePipProvider>
  );
}
