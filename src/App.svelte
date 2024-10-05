<script lang="ts">
  import * as SDK from "azure-devops-extension-sdk";
  import AppNavbar from "./lib/components/app-navbar.svelte";

  import "./tailwind.css";

  import Settings from "./lib/components/settings.svelte";
  import { SettingsService } from "./lib/services/settings.service";
  import { Spinner } from "@cloudparker/moldex.js";
    import Home from "./lib/components/home.svelte";

  enum RoutersEnum {
    SETTINGS,
    HOME,
    LOADER,
  }

  let settingsService: SettingsService | null = $state(null);

  let router: RoutersEnum = $state(RoutersEnum.LOADER);

  $effect(() => {
    if (!settingsService) {
      SDK.ready().then(async () => {
        ensureSettings();
      });
    }
  });

  async function ensureSettings() {
    settingsService = settingsService || (await new SettingsService().load());
    if (settingsService && !settingsService.hasBlobSasTokenUrl()) {
      router = RoutersEnum.SETTINGS;
    } else {
      router = RoutersEnum.HOME;
    }
  }

  function handleSettings() {
    if (router != RoutersEnum.SETTINGS) {
      router = RoutersEnum.SETTINGS;
    } else {
      router = RoutersEnum.HOME;
    }
  }

  function handleSettingsChange() {
    ensureSettings();
  }
</script>

<main class="min-h-full bg-base-50 dark:bg-base-900">
  <AppNavbar onSettings={handleSettings} />
  {#if router === RoutersEnum.HOME}
    {#if settingsService}
      <Home {settingsService}></Home>
    {/if}
  {:else if router === RoutersEnum.SETTINGS}
    {#if settingsService}
      <Settings {settingsService} onChange={handleSettingsChange} />
    {/if}
  {:else if router === RoutersEnum.LOADER}
    <div class="p-4 flex justify-center items-center">
      <Spinner />
    </div>
  {/if}
</main>
