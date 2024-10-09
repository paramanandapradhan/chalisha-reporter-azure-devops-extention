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
        test: any;
    };

    let { test }: PropsType = $props();

    let isStepsOpen: boolean = $state(true);
</script>

<div>
    <div class="border rounded">
        <div>
            <Button
                appearance="base"
                className="w-full !justify-start !rounded-none"
                iconPath={isStepsOpen ? mdiChevronDown : mdiChevronRight}
                label="Test Steps"
                onClick={() => isStepsOpen=!isStepsOpen}
            />
        </div>
        {#if isStepsOpen}
                <div transition:slide>
                    
                </div>
            {/if}

    </div>
</div>
