<script lang="ts">
  import AppNavbar from "./lib/components/app-navbar.svelte";
  import * as SDK from "azure-devops-extension-sdk";

  import "./tailwind.css";

  let isReady = $state(false);

  $effect(() => {
    if (import.meta.env.DEV) {
      isReady = true;
    } else {
      SDK.ready().then(() => {
        isReady = true;
      });
    }
  });
</script>

<main class="min-h-full bg-base-50 dark:bg-base-900">
  <AppNavbar />
</main>
