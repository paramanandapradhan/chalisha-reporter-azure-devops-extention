import { openDialog } from "@cloudparker/moldex.js";
import TestReportDialog from "../components/test-report-dialog.svelte";
 
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
        hasHeaderClose: true
    })
}