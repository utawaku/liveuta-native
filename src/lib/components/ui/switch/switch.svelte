<script lang="ts">
  import type { WithoutChildrenOrChild } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { Switch as SwitchPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    ...restProps
  }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
  bind:ref={ref}
  bind:checked={checked}
  class={cn(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    class={cn(
      "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
    )}
  />
</SwitchPrimitive.Root>
