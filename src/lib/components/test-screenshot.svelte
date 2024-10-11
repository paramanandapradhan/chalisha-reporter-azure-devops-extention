<script lang="ts">
    import { getContext } from "svelte";
    import {
        KEY_REPORT_SERVICE_CONTEXT,
        KEY_SETTINGS_SERVICE_CONTEXT,
        SettingsService,
    } from "../services/settings.service";
    import type { ReportService } from "../services/report.service";

    let { screenshot, index }: { screenshot: any; index: number } = $props();

    let isReady = $state(false);

    let settingsService: SettingsService | null = $derived.by(() => {
        if (screenshot) {
            return getContext(KEY_SETTINGS_SERVICE_CONTEXT);
        }
        return null;
    });

    let reportService: ReportService | null = $derived.by(() => {
        if (screenshot) {
            return getContext(KEY_REPORT_SERVICE_CONTEXT);
        }
        return null;
    });

    $effect(() => {
        console.log("settingsService", settingsService);
        console.log("reportService", reportService);
    });
</script>

{#if settingsService && reportService && screenshot}
    {@const sasUrl = `${settingsService.blobHost}/${screenshot.path}?${settingsService.sasToken}`}
    <div class="m-4 p-4 bg-base-100">
        <div class="h-96">
            <img src={sasUrl} alt="screenshot-{index}" />
        </div>
        <div class="mt-4">
            <a href={sasUrl} download="screenshot-{index}.png">
                Download Screenshot
            </a>
        </div>
    </div>
{/if}
