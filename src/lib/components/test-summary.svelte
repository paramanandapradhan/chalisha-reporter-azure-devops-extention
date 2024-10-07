<script lang="ts">
    import { Button, dateFormat, sort, toDate } from "@cloudparker/moldex.js";
    import { Collection, type DocumentType } from "../services/collection.service";
    import { mdiArrowRight, mdiFileDocumentOutline } from "../services/icon-service";
    import type { ReportService, TestResultType } from "../services/report.service";
    import type { SettingsService } from "../services/settings.service";
    import TestResultChart from "./test-result-chart.svelte";
    import TestResultSummaryChart from "./test-result-summary-chart.svelte";

    

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

    let selectedResult : TestResultType | null = $state(null)
    let testResultChartRef: any |null = $state(null);
    let testResultSummaryChartRef:any = $state(null);

    let resultItems = $derived.by(async () => {
        if (collection) {
            let items = await collection.getAllDocuments ();
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
            items = sort({array: items, field: 'date', isDate: true, desc: true});

            console.log('items', items);

            if(items?.length){
                let results = items?.map((item)=>item.data!)
                  selectTestResults(results);
            }
           
            if (items[0]?.data) {
                selectTestResult(items[0]?.data);
            }

          
            console.log('return items ' );
            return items;
        }
    });

    function handleSelectItem(item: ResultDocumentType){
        if(item?.data){
            selectTestResult(item.data  );
        }
       
    }

    function selectTestResults(results:TestResultType[]){
        if (testResultSummaryChartRef && results) {
             testResultSummaryChartRef.setTestResults(results);
        }
    }

    function selectTestResult(result:TestResultType){
        selectedResult = result;
        if (testResultChartRef) {
            testResultChartRef.setTestResult(selectedResult);
        }
    }
</script>

<div>
    <div class="pb-4">
        <h3 class="text-xl uppercase font-bold">{appName}</h3>
    </div>
    
    <div class="flex items-start gap-8">
        <div class="flex-1 h-64  overflow-y-auto">
            {#await resultItems then items}
                {#each items || [] as item}
                    <div class=" flex items-center w-full bg-base-200 hover:bg-base-300 pl-4 pr-2 rounded my-1 gap-2">
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
                        <Button className="!px-2  {selectedResult?.runId == item.data?.runId?'!bg-primary-500 !text-base-50' :'!text-base-500'}" 
                        iconPath={mdiArrowRight} iconClassName="!w-4 !h-4" onClick={()=>handleSelectItem(item)} ></Button>
                   </div>
                    </div>
                {/each}
            {/await}
        </div>
        <div class="flex-1">
            <TestResultChart  bind:this={testResultChartRef} /> 
        </div>
        <div class="flex-1">
            <TestResultSummaryChart  bind:this={testResultSummaryChartRef} />
        </div> 
    </div>
</div>
