<script lang="ts">
    import { Collection } from "../services/collection.service";
    import { dateFormat, toDate, Button } from "@cloudparker/moldex.js";
    import { mdiArrowRight, mdiFileDocumentOutline } from "../services/icon-service";
    import type { ReportService, TestResultType } from "../services/report.service";
    import type { SettingsService } from "../services/settings.service";


    type PropsType = {
        settingsService: SettingsService;
        reportService: ReportService;
        appName?: string;
    };

    let { settingsService, reportService, appName }: PropsType = $props();
     
    let collection = $derived.by(() => {
        if (appName) {
            return new Collection(appName);
        }
    });
    let resultItems = $derived.by(async () => {
        if (collection) {
            let items = await collection.getAllDocuments<TestResultType>();
            console.log("items", items);
            return items;
        }
    });
</script>

<div>
    <div class="pb-4">
        <h3 class="text-xl uppercase font-bold">{appName}</h3>
    </div>
    
    <div class="flex items-start h-64">
        <div class="flex-1 h-full overflow-y-auto">
            {#await resultItems then items}
                {#each items || [] as item}
                    <div class=" flex items-center w-full bg-base-200 hover:bg-base-300 pl-4 pr-2 rounded my-1 gap-3">
                        <div class="text-base-500 flex-grow py-2">
                            { dateFormat(toDate(item?.data?.startTime)!)}
                        </div>
                        <div class="px-3 font-black {item?.data?.passedTests==item?.data?.totalTests? 'text-green-600':'text-base-600'} ">
                            {item?.data?.passedTests} / {item?.data?.totalTests}
                        </div>
                       <div>
                            <Button className="!px-2 !text-base-500" iconPath={mdiFileDocumentOutline} iconClassName="!w-4 !h-4" ></Button>
                       </div>
                       <div>
                        <Button className="!px-2 !text-base-500" iconPath={mdiArrowRight} iconClassName="!w-4 !h-4" ></Button>
                   </div>
                    </div>
                {/each}
            {/await}
        </div>
        <div class="flex-1"></div>
        <div class="flex-1"></div>
    </div>
</div>
