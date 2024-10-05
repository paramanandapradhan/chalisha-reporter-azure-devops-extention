<script lang="ts">
    import { Button, dateFormat, sort, toDate } from "@cloudparker/moldex.js";
    import { Collection, type DocumentType } from "../services/collection.service";
    import { mdiArrowRight, mdiFileDocumentOutline } from "../services/icon-service";
    import type { ReportService, TestResultType } from "../services/report.service";
    import type { SettingsService } from "../services/settings.service";


    type PropsType = {
        settingsService: SettingsService;
        reportService: ReportService;
        appName?: string;
    };

    type ResultDocumentType = DocumentType<TestResultType> & {
        mesurmentClassName?:string;
    }

    let { settingsService, reportService, appName }: PropsType = $props();
     
    let collection = $derived.by(() => {
        if (appName) {
            return new Collection< ResultDocumentType, TestResultType>(appName);
        }
    });

    let resultItems = $derived.by(async () => {
        if (collection) {
            let items = await collection.getAllDocuments ()  ;
                items= items.map((o)=>{
                    o.date =  toDate(o.data?.startTime);
                    if (o.data?.passedTests == o.data?.totalTests){
                        o.mesurmentClassName = 'text-green-600'
                    }else if((o.data?.passedTests||0 ) < (o.data?.totalTests || 0)){
                        o.mesurmentClassName = 'text-red-600'
                    } else {
                        o.mesurmentClassName = 'text-base-600'
                    }
                    
                    return o;
                });
            items = sort({array: items, field: 'date', isDate: true, desc: true})
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
                        <div class="px-3 font-black {item.mesurmentClassName} ">
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
