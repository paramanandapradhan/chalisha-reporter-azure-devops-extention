<script lang="ts">
    import { Button, Icon } from "@cloudparker/moldex.js";
    import { mdiCheckCircle, mdiCloseCircle } from "../services/icon-service";
    import { browsersColors } from "../services/utils.service";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import { openTestDetailsDialog } from "../services/reports.ui.service";

    type PropsType = {
        tests: any[];
        searchText?: string;
    };

    let { tests, searchText }: PropsType = $props();

    let filteredTests = $derived.by(() => {
        if (searchText) {
            tests.filter((item) => {
                return (
                    ((item.title || "") as string)
                        .toLowerCase()
                        .indexOf(searchText) >= 0
                );
            });
        } else {
            return tests;
        }
    });

    function handleOpenTestDetails(test: any) {
        if (test) {
            openTestDetailsDialog(test)
        }
    }
</script>

<div>
    {#each filteredTests || [] as test, index}
        <hr />
        <Button
            className="text-start justify-start w-full hover:bg-base-100 py-4 gap-4"
            onClick={() => handleOpenTestDetails(test)}
        >
            <div>
                <Icon
                    path={test.status == "passed"
                        ? mdiCheckCircle
                        : mdiCloseCircle}
                    className=" {test.status == 'passed'
                        ? 'text-green-600'
                        : 'text-red-600'}"
                />
            </div>
            <div class="flex-grow">
                <div class="flex align-center gap-4">
                    <div>
                        {test.test?.title || ""}
                    </div>
                    <div>
                        {#if test?.browser?.name}
                            <BrowerNameChip name={test?.browser?.name} />
                        {/if}
                    </div>
                </div>
                <div class="text-sm text-base-400">
                    {test.test?.location || ""}
                </div>
            </div>
            <div class="text-sm text-base-500">
                {test.duration || "0"} ms
            </div>
        </Button>
    {/each}
</div>
