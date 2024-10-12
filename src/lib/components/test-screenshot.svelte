<script lang="ts">
    import { Button, downloadFile, downloadURI } from "@cloudparker/moldex.js";
    import type { ReportService } from "../services/report.service";
    import { SettingsService } from "../services/settings.service";

    type PropsType = {
        testSuite: any;
        test: any;
        screenshot: any;
        index: number;
        settingsService: SettingsService;
        reportService: ReportService;
    };

    let {
        testSuite,
        test,
        screenshot,
        index,
        settingsService,
        reportService,
    }: PropsType = $props();

    let sscreenshotSasUrl: string | null = $derived.by(() => {
        console.log("screen shot test", test);
        if (
            settingsService &&
            reportService &&
            screenshot?.path &&
            test &&
            testSuite
        ) {
            let screenshotPath = screenshot?.path.replace(
                testSuite.reportDir,
                "",
            );
            if (screenshotPath) {
                return `${settingsService.blobHost}/${testSuite.reportDir}/${testSuite.appName}/${testSuite.runId}/${screenshotPath}?${settingsService.sasToken}`;
            }
        }
        return null;
    });

    $effect(() => {
        console.log("settingsService", settingsService);
        console.log("reportService", reportService);
    });

    function handleDownload() {
        if (sscreenshotSasUrl) {
            downloadURI(sscreenshotSasUrl, "screenshot.png");
        }
    }
</script>

{#if sscreenshotSasUrl}
    <div class="p-4">
        <div>
            <img
                src={sscreenshotSasUrl}
                alt="screenshot-{index}"
                class="h-72"
            />
        </div>
        <div class="p-4">
            <Button appearance="primary" onClick={handleDownload}>
                Download Screenshot
            </Button>
        </div>
    </div>
{/if}
