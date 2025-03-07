<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Tabs as TabsPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: TabsPrimitive.ContentProps = $props();
</script>

<TabsPrimitive.Content
  bind:ref={ref}
  class={cn(
    "mt-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
    className,
  )}
  {...restProps}
/>
