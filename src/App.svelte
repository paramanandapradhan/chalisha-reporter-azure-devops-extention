<script lang="ts">
  import * as SDK from "azure-devops-extension-sdk";
  import AppNavbar from "./lib/components/app-navbar.svelte";

  import "./tailwind.css";

  import Settings from "./lib/components/settings.svelte";
  import {
    KEY_REPORT_SERVICE_CONTEXT,
    KEY_SETTINGS_SERVICE_CONTEXT,
    SettingsService,
  } from "./lib/services/settings.service";
  import { Spinner } from "@cloudparker/moldex.js";
  import Home from "./lib/components/home.svelte";
  import { ReportService } from "./lib/services/report.service";
  import { getContext, setContext } from "svelte";

  enum RoutersEnum {
    SETTINGS,
    HOME,
    LOADER,
  }

  let settingsService: SettingsService | null = $state(null);
  let reportService: ReportService | null = $state(null);

  let router: RoutersEnum = $state(RoutersEnum.LOADER);

  $effect(() => {
    if (!settingsService) {
      SDK.ready().then(async () => {
        await ensureSettings();
        if (settingsService) {
          reportService = await new ReportService(settingsService).load();
          setContext(KEY_SETTINGS_SERVICE_CONTEXT, settingsService);
          setContext(KEY_REPORT_SERVICE_CONTEXT, reportService);

          console.log('KEY_SETTINGS_SERVICE_CONTEXT', getContext(KEY_SETTINGS_SERVICE_CONTEXT));
          console.log('KEY_REPORT_SERVICE_CONTEXT', getContext(KEY_REPORT_SERVICE_CONTEXT));
        }
      });
    }
  });

  async function ensureSettings() {
    settingsService = settingsService || (await new SettingsService().load());
    if (settingsService && !settingsService.hasRequiredSettings) {
      router = RoutersEnum.SETTINGS;
    } else {
      router = RoutersEnum.HOME;
    }
    return settingsService;
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

  function handleSettingsClose() {
    router = RoutersEnum.HOME;
  }
</script>

<main class="min-h-full bg-base-50 dark:bg-base-900">
  <AppNavbar onSettings={handleSettings} />
  {#if router === RoutersEnum.HOME}
    {#if settingsService && reportService}
      <Home {settingsService} {reportService}></Home>
    {/if}
  {:else if router === RoutersEnum.SETTINGS}
    {#if settingsService}
      <Settings
        {settingsService}
        onChange={handleSettingsChange}
        onClose={handleSettingsClose}
      />
    {/if}
  {:else if router === RoutersEnum.LOADER}
    <div class="p-4 flex justify-center items-center">
      <Spinner />
    </div>
  {/if}
</main>
