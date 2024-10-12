<script lang="ts">
    import { Button } from "@cloudparker/moldex.js";
    import { slide } from "svelte/transition";
    import { mdiChevronDown, mdiChevronRight } from "../services/icon-service";
    import TestScreenshot from "./test-screenshot.svelte";
    import type { SettingsService } from "../services/settings.service";
    import type { ReportService } from "../services/report.service";

    type PropsType = {
        testSuite: any;
        test: any;
        screenshots: any[];
        settingsService: SettingsService;
        reportService: ReportService;
    };

    let { testSuite, test, screenshots, settingsService, reportService }: PropsType =
        $props();

    let isErrorOpen: boolean = $state(true);
</script>

{#if screenshots?.length}
    <div>
        <div class="border rounded">
            <div>
                <Button
                    appearance="base"
                    className="w-full !justify-start !rounded-none"
                    iconPath={isErrorOpen ? mdiChevronDown : mdiChevronRight}
                    label="Screenshots"
                    onClick={() => (isErrorOpen = !isErrorOpen)}
                />
            </div>
            {#if isErrorOpen}
                <div transition:slide class="">
                    {#each screenshots as screenshot, index}
                        <div>
                            <TestScreenshot
                                {testSuite}
                                {test}
                                {screenshot}
                                {index}
                                {settingsService}
                                {reportService}
                            />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
