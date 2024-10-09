<script lang="ts">
    import { Icon, mdiCheckCircle } from "@cloudparker/moldex.js";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import { mdiCloseCircle } from "../services/icon-service";

    type PropsType = {
        test: any;
    };

    let { test }: PropsType = $props();
</script>

<div class="px-4">
    <div class="my-4 flex items-center">
        <div class="flex-grow">
            <div>
                <h3 class="text-2xl font-bold">{test?.test?.title || ""}</h3>
            </div>
            <div class="text-base-500 text-sm mb-4">
                <span>{test?.test?.suiteTitle || ""}</span>
            </div>
            <div class="">
                {#if test?.browser?.name}
                    <BrowerNameChip name={test?.browser?.name} />
                {/if}
            </div>
        </div>
        <div>
            <span class="text-sm text-base-500">{test?.duration || "0"} ms</span
            >
        </div>
    </div>
    <div class="flex w-full border-b border-base-300">
        <div class="flex items-center gap-4 py-3 border-b-2 border-base-500 bg-base-200 px-4">
            <div class="">
                <Icon
                    path={test.status == "passed" ? mdiCheckCircle : mdiCloseCircle}
                    className=" {test.status == 'passed'
                        ? 'text-green-600'
                        : 'text-red-600'}"
                />
            </div>
            <div class="">
                Run
            </div>
        </div>
        
    </div>
</div>
