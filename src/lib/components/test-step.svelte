<script lang="ts">
    import { Icon, mdiCheckCircle, Button } from "@cloudparker/moldex.js";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import {
        mdiChevronDown,
        mdiChevronRight,
        mdiCloseCircle,
    } from "../services/icon-service";
    import TestSteps from "./test-steps.svelte";
    import { slide } from "svelte/transition";

    type PropsType = {
        step: any;
    };

    let { step }: PropsType = $props();
    let isStepOpen: boolean = $state(false);

    function handleOpenStep(){
        isStepOpen = !isStepOpen;
    }
</script>

{#snippet  stepLine()}
    <div class="w-full flex items-center my-1 gap-2">
        <div class="w-5 h-5">
            {#if step.steps?.length}
                <Icon path={isStepOpen ? mdiChevronDown : mdiChevronRight} className="!w-5 !h-5 text-base-500" />
            {/if}
        </div>
        <div>
            <Icon
                path={!step.error ? mdiCheckCircle : mdiCloseCircle}
                className=" !w-5 !h-5 {!step.error ? 'text-green-600' : 'text-red-600'}"  
            />
        </div>
        <div class="flex-grow test-base-600 text-sm text-base-600">
            {step?.name || ""}
        </div>
        <div class="text-base-500">
            {step?.duration || "0"} ms
        </div>
    </div>
{/snippet}

<div>
    {#if step.steps?.length}
        <Button className="w-full !px-0 !py-0 !text-start !justify-start" onClick={handleOpenStep}> 
            {@render stepLine()}
        </Button>
    {:else}
        {@render stepLine()}
    {/if}
    {#if isStepOpen}
        <div class="pl-4" transition:slide>
            <TestSteps steps={step.steps} />
        </div>
    {/if}
</div>
