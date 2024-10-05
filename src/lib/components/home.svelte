<script lang="ts">
    import type { ReportService } from "../services/report.service";
    import type { SettingsService } from "../services/settings.service";
    import TestSummary from "./test-summary.svelte";

    type PropsType = {
        settingsService: SettingsService;
        reportService: ReportService;
    };

    let { settingsService, reportService }: PropsType = $props();

    let appNames: string[] = $derived.by(() => {
        if (reportService) {
            return reportService.appNames as string[];
        }
        return [];
    });
</script>

<div class="p-4">
    <!-- <div>
        <h3 class="text-xl">Reports</h3>
    </div> -->
    <div class="bg-base-100 p-4 rounded">
        {#each appNames as appName}
            <TestSummary {appName} {reportService} {settingsService} />
        {/each}
    </div>
</div>
