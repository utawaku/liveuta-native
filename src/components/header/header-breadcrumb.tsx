import { For, Show } from "solid-js";
import { Link, useNavigate, useRouter } from "@tanstack/solid-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { useBreadcrumbs } from "../providers/breadcrumb.provider";

export function HeaderBreadcrumb() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <For each={breadcrumbs()}>
          {(breadcrumb, index) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  to={breadcrumb.path}
                  class={
                    index() === breadcrumbs().length - 1
                      ? "font-bold text-primary hover:text-primary"
                      : ""
                  }
                >
                  {breadcrumb.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Show when={index() < breadcrumbs().length - 1}>
                <BreadcrumbSeparator />
              </Show>
            </>
          )}
        </For>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
