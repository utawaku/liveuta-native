<script lang="ts">
  import type { WithoutChild } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { Select as SelectPrimitive } from "bits-ui";
  import ChevronDown from "lucide-svelte/icons/chevron-down";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<SelectPrimitive.TriggerProps> = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref={ref}
  class={cn(
    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
  <ChevronDown class="size-4 opacity-50" />
</SelectPrimitive.Trigger>
