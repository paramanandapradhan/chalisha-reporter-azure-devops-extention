<script lang="ts">
    import { Button, mdiChevronRight } from "@cloudparker/moldex.js";
    import { groupBy, type GroupedObject } from "../services/utils.service";
    import TestCaseList from "./test-case-list.svelte";

    type PropsType = {
        reportJson: any;
    };
    let { reportJson }: PropsType = $props();

    let reportGroups: GroupedObject<any> = $derived.by(() => {
        return groupBy(reportJson.tests || [], "test.suiteTitle");
    });
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
                iconPath={mdiChevronRight}
                label={groupKey}
            />
            <div>
                <TestCaseList tests={reportGroups[groupKey]}/>
            </div>
        </div>
    {/each}
</div>
