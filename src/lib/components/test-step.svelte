<script lang="ts">
    import { Icon, mdiCheckCircle, Button } from "@cloudparker/moldex.js";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import {
        mdiChevronDown,
        mdiChevronRight,
        mdiCloseCircle,
    } from "../services/icon-service";
    import { slide } from "svelte/transition";

    type PropsType = {
        step: any;
    };

    let { step }: PropsType = $props();
    let isStepOpen: boolean = $state(false);
</script>

<div class="flex items-center">
    <div class="w-6 h-6">
        {#if step.steps?.length}
            <Icon path={isStepOpen ? mdiChevronDown : mdiChevronRight} />
        {/if}
    </div>
    <div>
        <Icon
            path={!step.error ? mdiCheckCircle : mdiCloseCircle}
            className=" {!step.error ? 'text-green-600' : 'text-red-600'}"
        />
    </div>
    <div class="flex-grow test-base-600">
        {step?.name || ""}
    </div>
    <div class="text-base-500">
        {step?.duration || "0"} ms
    </div>
</div>
