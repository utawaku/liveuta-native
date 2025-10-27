import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { Component, JSX, ValidComponent } from "solid-js";

import { splitProps } from "solid-js";
import * as TooltipPrimitive from "@kobalte/core/tooltip";

import { cn } from "~/lib/utils";

const TooltipTrigger = TooltipPrimitive.Trigger;

const Tooltip: Component<TooltipPrimitive.TooltipRootProps> = (props) => {
  return <TooltipPrimitive.Root gutter={4} {...props} />;
};

type TooltipContentProps<T extends ValidComponent = "div"> =
  TooltipPrimitive.TooltipContentProps<T> & {
    children: JSX.Element;
    class?: string | undefined;
  };

const TooltipContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TooltipContentProps<T>>,
) => {
  const [local, others] = splitProps(props as TooltipContentProps, ["children", "class"]);
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "z-50 w-fit origin-[var(--kb-popover-content-transform-origin)] animate-in overflow-hidden rounded-md border bg-popover-foreground px-3 py-1.5 text-xs text-balance text-popover shadow-md fade-in-0 zoom-in-95",
          local.class,
        )}
        {...others}
      >
        {local.children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent };
