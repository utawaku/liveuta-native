<script lang="ts">
  import { Drawer as DrawerPrimitive } from "vaul-svelte";

  let {
    shouldScaleBackground = true,
    open = $bindable(false),
    activeSnapPoint = $bindable(null),
    ...restProps
  }: DrawerPrimitive.RootProps = $props();
</script>

<DrawerPrimitive.NestedRoot
  shouldScaleBackground={shouldScaleBackground}
  bind:open={open}
  bind:activeSnapPoint={activeSnapPoint}
  {...restProps}
/>
