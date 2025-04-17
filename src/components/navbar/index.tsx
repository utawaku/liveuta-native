import { Link } from "@tanstack/solid-router";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";

export function Navbar() {
  return (
    <header class="bg-background/60 ease-expo-in-out-custom fixed z-50 flex h-16 w-full shrink-0 items-center gap-2 backdrop-blur transition-[width,height] md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div class="flex w-full items-center justify-between px-4 md:hidden">
        <div>
          <Link to="/" class="text-xl font-semibold">
            Live Uta
          </Link>
        </div>
        <div>
          <SidebarTrigger class="" />
        </div>
      </div>
      <div class="hidden items-center gap-2 px-4 md:flex">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
