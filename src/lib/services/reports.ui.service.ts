import { openDialog } from "@cloudparker/moldex.js";
import TestReportDialog from "../components/test-report-dialog.svelte";
import TestDetailsDialog from "../components/test-details-dialog.svelte";
 
export async function openTestReportDialog(reportJson: any) {

    await openDialog({
        bodyComponent: TestReportDialog,
        props: {
            reportJson,
        },
        title: "Report",
        hasHeader: true,
        hasTitle: true,
        size: 'full',
        hasHeaderClose: true,
        hasHeaderBack:true,
    })
}


export async function openTestDetailsDialog(test: any) {

    await openDialog({
        bodyComponent: TestDetailsDialog,
        props: {
            test,
        },
        title: "Test Details",
        hasHeader: true,
        hasTitle: true,
        size: 'full',
        hasHeaderBack:true,
        hasHeaderClose: true
    })
}