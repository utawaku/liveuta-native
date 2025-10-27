import { Link } from "@tanstack/solid-router";

import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { HeaderBreadcrumb } from "./header-breadcrumb";

export function Navbar() {
  return (
    <header class="fixed z-50 flex h-header w-full shrink-0 items-center gap-2 bg-background/60 backdrop-blur transition-[width,height] ease-expo-in-out-custom">
      <div class="flex w-full items-center justify-between px-4 md:hidden">
        <div>
          <Link to="/" class="text-xl font-semibold">
            Live Uta
          </Link>
        </div>
        <div>
          <SidebarTrigger />
        </div>
      </div>
      <div class="hidden items-center gap-2 px-4 md:flex">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <HeaderBreadcrumb />
      </div>
    </header>
  );
}
