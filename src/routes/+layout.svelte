<script lang="ts">
  import "../app.css";
  import { Navbar } from "$lib/components/navbar";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<Navbar />
{@render children()}
<ModeWatcher />
