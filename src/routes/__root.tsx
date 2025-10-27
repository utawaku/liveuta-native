import { onMount } from "solid-js";
import { createRootRouteWithContext, Outlet, useNavigate } from "@tanstack/solid-router";

import { Navbar } from "~/components/header";
import { BreadcrumbsProvider } from "~/components/providers/breadcrumb.provider";
import { CommandPaletteProvider } from "~/components/providers/command-palette.provider";
import { ShortcutProvider } from "~/components/providers/global-shortcut.provider";
import { useSettings } from "~/components/providers/settings.provider";
import { YoutubePipProvider } from "~/components/providers/youtube-pip.provider";
import { AppSidebar } from "~/components/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  const { settings } = useSettings();

  const navigate = useNavigate();
  onMount(() => {
    if (settings.defaultPage !== "/") {
      navigate({ to: settings.defaultPage });
    }
  });
  return (
    <SidebarProvider>
      <YoutubePipProvider>
        <CommandPaletteProvider>
          <ShortcutProvider>
            <AppSidebar />
            <SidebarInset>
              <BreadcrumbsProvider>
                <Navbar />
                <div class="mt-12">
                  <Outlet />
                </div>
                {/* <TanStackRouterDevtools /> */}
              </BreadcrumbsProvider>
            </SidebarInset>
          </ShortcutProvider>
        </CommandPaletteProvider>
      </YoutubePipProvider>
    </SidebarProvider>
  );
}
