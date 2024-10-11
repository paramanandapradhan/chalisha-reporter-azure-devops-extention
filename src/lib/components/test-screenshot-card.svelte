<script lang="ts">
    import { Button } from "@cloudparker/moldex.js";
    import { slide } from "svelte/transition";
    import { mdiChevronDown, mdiChevronRight } from "../services/icon-service";
    import TestScreenshot from "./test-screenshot.svelte";

    type PropsType = {
        screenshots: any[];
    };

    let { screenshots }: PropsType = $props();

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
        {#if isErrorOpen }
            <div transition:slide class="p-4">
                {#each screenshots as screenshot, index}
                    <div class="bg-base-100 rounded p-4">
                        <TestScreenshot {screenshot} {index}/>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
{/if}
