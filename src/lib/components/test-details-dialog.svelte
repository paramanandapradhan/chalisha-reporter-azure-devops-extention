<script lang="ts">
    import { Icon, mdiCheckCircle } from "@cloudparker/moldex.js";
    import BrowerNameChip from "./brower-name-chip.svelte";
    import { mdiCloseCircle } from "../services/icon-service";
    import TestStepsCard from "./test-steps-card.svelte";
    import TestErrorCard from "./test-error-card.svelte";
    import TestScreenshotCard from "./test-screenshot-card.svelte";
    import type { SettingsService } from "../services/settings.service";
    import type { ReportService } from "../services/report.service";

    type PropsType = {
        testSuite: any;
        test: any;
        settingsService: SettingsService;
        reportService: ReportService;
    };

    let { testSuite, test, settingsService, reportService }: PropsType = $props();

    let screenshots: any[] = $derived.by(() => {
        return (test?.attachments || []).filter(
            (attachment: any) => attachment?.name == "screenshot",
        );
    });
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
            <span class="text-sm text-base-500">
                {test?.duration || "0"} ms
            </span>
        </div>
    </div>
    <div class="flex w-full border-b border-base-300">
        <div
            class="flex items-center gap-4 py-3 border-b-2 border-base-500 bg-base-200 px-4"
        >
            <div class="">
                <Icon
                    path={test.status == "passed"
                        ? mdiCheckCircle
                        : mdiCloseCircle}
                    className=" {test.status == 'passed'
                        ? 'text-green-600'
                        : 'text-red-600'}"
                />
            </div>
            <div class="">Run</div>
        </div>
    </div>
    <div class="my-6 bg-base-100">
        <TestStepsCard {test} />
    </div>
    {#if test?.error}
        <div class="my-6">
            <TestErrorCard {test} />
        </div>
    {/if}

    {#if screenshots}
        <div class="my-6">
            <TestScreenshotCard
                {testSuite}
                {test}
                {screenshots}
                {settingsService}
                {reportService}
            />
        </div>
    {/if}
</div>
