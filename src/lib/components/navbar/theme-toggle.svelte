<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import DeviceDesktop from "$lib/icons/tabler/device-desktop.svelte";
  import Moon from "$lib/icons/tabler/moon.svelte";
  import Sun from "$lib/icons/tabler/sun.svelte";
  import { resetMode, setMode } from "mode-watcher";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
    <Sun
      class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item onclick={() => setMode("light")}><Sun /> Light</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => setMode("dark")}><Moon /> Dark</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => resetMode()}><DeviceDesktop /> System</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
