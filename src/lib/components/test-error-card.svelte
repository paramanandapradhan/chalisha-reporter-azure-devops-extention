<script lang="ts">
    import { Button } from "@cloudparker/moldex.js";
    import { slide } from "svelte/transition";
    import { mdiChevronDown, mdiChevronRight } from "../services/icon-service";
    import TestError from "./test-error.svelte";

    type PropsType = {
        test: any;
    };

    let { test }: PropsType = $props();

    let isErrorOpen: boolean = $state(true);
</script>

<div>
    <div class="border rounded">
        <div>
            <Button
                appearance="base"
                className="w-full !justify-start !rounded-none"
                iconPath={isErrorOpen ? mdiChevronDown : mdiChevronRight}
                label="Error"
                onClick={() => (isErrorOpen = !isErrorOpen)}
            />
        </div>
        {#if isErrorOpen && test?.error?.message}
            <div transition:slide class="p-4">
                <div class="bg-base-100 rounded p-4">
                    <TestError {test} />
                </div>
            </div>
        {/if}
    </div>
</div>
