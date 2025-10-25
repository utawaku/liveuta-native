import { For, Show } from "solid-js";
import { Link, useRouter } from "@tanstack/solid-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

export function Navbar() {
  const router = useRouter();
  const pathname = () => router.state.location.pathname.split("/").toSpliced(4);

  return (
    <header class="fixed z-50 flex h-16 w-full shrink-0 items-center gap-2 bg-background/60 backdrop-blur transition-[width,height] ease-expo-in-out-custom md:group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
      <Show when={pathname().length > 0}>
        <div class="hidden items-center gap-2 px-4 md:flex">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <For each={pathname().toSpliced(0, 1)}>
                {(path, index) => (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        as={Link}
                        to={pathname()
                          .slice(0, index() + 2)
                          .join("/")}
                      >
                        {path}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <Show when={index() + 2 !== pathname().length}>
                      <BreadcrumbSeparator />
                    </Show>
                  </>
                )}
              </For>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Show>
    </header>
  );
}
