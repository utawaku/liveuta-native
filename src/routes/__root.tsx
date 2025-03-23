import { createRootRouteWithContext, Outlet } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { Navbar } from "~/components/navbar";
import { AppSidebar } from "~/components/sidebar";
import { SidebarInset } from "~/components/ui/sidebar";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <TanStackRouterDevtools />
        <Outlet />
      </SidebarInset>
    </>
  );
}
