import { createRootRouteWithContext, Outlet } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
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
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <Outlet />
          {/* <TanStackRouterDevtools /> */}
        </SidebarInset>
      </SidebarProvider>
    </YoutubePipProvider>
  );
}
