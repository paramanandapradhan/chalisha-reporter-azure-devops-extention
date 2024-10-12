<script lang="ts">
    import { Button, mdiChevronRight, mdiChevronDown } from "@cloudparker/moldex.js";
    import { groupBy, type GroupedObject } from "../services/utils.service";
    import { slide } from "svelte/transition";
    import TestList from "./test-list.svelte";
    import type { SettingsService } from "../services/settings.service";
    import type { ReportService } from "../services/report.service";

    type PropsType = {
        testSuite: any;
        settingsService:SettingsService,
        reportService:ReportService
    };
    let { testSuite , settingsService, reportService}: PropsType = $props();

    let selectedGroup: string | null = $state(null);

    let reportGroups: GroupedObject<any> = $derived.by(() => {
        return groupBy(testSuite.tests || [], "test.suiteTitle");
    });

    function handleSelectGroup(key: string) {
        if (selectedGroup == key) {
            selectedGroup = null;
        } else {
            selectedGroup = key;
        }
    }
</script>

<div class="px-4">
    <!-- <div>
        {JSON.stringify(reportGroups)}
    </div> -->
    {#each Object.keys(reportGroups || []) as groupKey, index}
        <div class="w-full rounded border my-4">
            <Button
                appearance="base"
                className="w-full !justify-start !rounded-none"
                iconPath={selectedGroup == groupKey ? mdiChevronDown: mdiChevronRight}
                label={groupKey}
                onClick={() => handleSelectGroup(groupKey)}
            />
            {#if selectedGroup == groupKey}
                <div transition:slide>
                    <TestList {testSuite} tests={reportGroups[groupKey]} {settingsService} { reportService} />
                </div>
            {/if}
        </div>
    {/each}
</div>
