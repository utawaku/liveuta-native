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
    <SidebarProvider>
      <YoutubePipProvider>
        <CommandPaletteProvider>
          <ShortcutProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              <div class="mt-16 md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:mt-12">
                <Outlet />
              </div>
              {/* <TanStackRouterDevtools /> */}
            </SidebarInset>
          </ShortcutProvider>
        </CommandPaletteProvider>
      </YoutubePipProvider>
    </SidebarProvider>
  );
}
