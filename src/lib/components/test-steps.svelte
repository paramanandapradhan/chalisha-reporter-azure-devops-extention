<script lang="ts">
    import { Icon, mdiCheckCircle, Button } from "@cloudparker/moldex.js";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import {
        mdiChevronDown,
        mdiChevronRight,
        mdiCloseCircle,
    } from "../services/icon-service";
    import { slide } from "svelte/transition";
    import TestStep from "./test-step.svelte";

    type PropsType = {
        steps: any[];
    };

    let { steps }: PropsType = $props();
</script>

<div>
    {#each steps as step, index}
        <div>
            <TestStep {step} />
        </div>
    {/each}
</div>
