<script lang="ts">
    import { Collection } from "../services/collection.service";
    import { dateFormat, toDate, Button } from "@cloudparker/moldex.js";
    import { mdiFileDocumentOutline } from "../services/icon-service";
    import type { TestResultType } from "../services/report.service";

    type PropsType = {
        appName?: string;
    };

    let { appName }: PropsType = $props();
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
    <div></div>
    <div class="flex items-center">
        <div class="flex-1">
            {#await resultItems then items}
                {#each items || [] as item}
                    <div class="flex items-center w-full bg-base-200 hover:bg-base-300 pl-4 pr-2  rounded my-1">
                        <div class="text-base-500 flex-grow py-2">
                            { dateFormat(toDate(item?.data?.startTime)!)}
                        </div>
                        <div class="px-4 font-black {item?.data?.passedTests==item?.data?.totalTests? 'text-green-600':'text-base-600'} ">
                            {item?.data?.passedTests} / {item?.data?.totalTests}
                        </div>
                       <div>
                            <Button className="!px-2 !text-base-500" iconPath={mdiFileDocumentOutline} iconClassName="!w-4 !h-4" ></Button>
                       </div>
                    </div>
                {/each}
            {/await}
        </div>
        <div class="flex-1"></div>
    </div>
</div>
