import { openDialog } from "@cloudparker/moldex.js";
import TestReportDialog from "../components/test-report-dialog.svelte";
import TestDetailsDialog from "../components/test-details-dialog.svelte";
import type { SettingsService } from "./settings.service";
import type { ReportService } from "./report.service";

export async function openTestReportDialog(testSuite: any, settingsService: SettingsService, reportService: ReportService) {

    await openDialog({
        bodyComponent: TestReportDialog,
        props: {
            testSuite,
            settingsService,
            reportService
        },
        title: "Report",
        hasHeader: true,
        hasTitle: true,
        size: 'full',
        hasHeaderClose: true,
        hasHeaderBack: true,
    })
}


export async function openTestDetailsDialog(
    testSuite: any,
    test: any,
    settingsService: SettingsService,
    reportService: ReportService
) {

    await openDialog({
        bodyComponent: TestDetailsDialog,
        props: {
            testSuite,
            test,
            settingsService,
            reportService
        },
        title: "Test Details",
        hasHeader: true,
        hasTitle: true,
        size: 'full',
        hasHeaderBack: true,
        hasHeaderClose: true
    })
}