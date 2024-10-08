import { Collection } from "./collection.service";
import type { SettingsService } from "./settings.service";
import { BlobServiceClient } from '@azure/storage-blob';
import { findAddedItems, findRemovedItems } from "./utils.service";
import { fileToText } from "@cloudparker/moldex.js";

const chalishaReporterPrefixPath = 'chalisha-reporter'; // Path to list the folders (inside the 'reports' container)

export type TestResultType = {
    timedOutTests?: number;
    totalTests?: number
    duration?: number,
    failedTests?: number;
    interruptedTests?: number,
    passedTests?: number,
    skippedTests?: number;
    runId?: string;
    startTime?: string;
    status?: 'passed' | 'failed';
}

export class ReportService {
    settingsService: SettingsService;
    appNames: string[] = [];

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    async load() {
        if (this.settingsService && this.settingsService.hasRequiredSettings) {
            this.appNames = await this.loadFoldersInPath(chalishaReporterPrefixPath) || [];
            // console.log('appNames', this.appNames);
            if (this.appNames) {
                let appTasks = this.appNames.map(async (appName: string) => {
                    await this.syncReportsByApp(appName);
                });
                await Promise.all(appTasks);
            }
        }
        return this;
    }

    private async syncReportsByApp(appName: string) {
        let storageReportsIds = await this.loadFoldersInPath(chalishaReporterPrefixPath + `/${appName}`) || [];
        let collection = new Collection(appName);
        let docs = await collection.getAllDocuments();
        let collectionReportsIds = docs.map(o => o.id) as string[];

        let removedIds = findRemovedItems(collectionReportsIds, storageReportsIds);
        if (removedIds?.length) {
            await Promise.all(removedIds.map(async (id: string) => {
                await collection.removeDocument(id)
            }));
        }

        let addedIds = findAddedItems(collectionReportsIds, storageReportsIds);
        if (addedIds?.length) {
            console.log('addedIds', collectionReportsIds, addedIds);
            await Promise.all(addedIds.map(async (id: string) => {
                let doc = await this.fetchTestResult(appName, id);
                if (doc) {
                    console.log('doc', id, doc)
                    await collection.createDocument({ id: id, data: doc })
                }
            }));
        }
    }

    private async fetchJsonFile(filePath: string) {
        // const filePath = `${chalishaReporterPrefixPath}/${appName}/${runId}/result.json`;
        const accountName = this.settingsService.account;
        const container = this.settingsService.container as string;
        const sasToken = this.settingsService.sasToken;
        // fetch file from azure blob storage
        const blobServiceUrl = `https://${accountName}.blob.core.windows.net`;
        const blobUrl = `${blobServiceUrl}/${container}/${filePath}?${sasToken}`;
        const blobServiceClient = new BlobServiceClient(`${blobServiceUrl}?${sasToken}`);

        // Get the container client
        const containerClient = blobServiceClient.getContainerClient(container);

        // Get the block blob client for the specific file
        const blockBlobClient = containerClient.getBlockBlobClient(filePath);

        // console.log(`Fetching file from: ${blobUrl}`);

        // Check if the blob exists before attempting to download
        const blobExists = await blockBlobClient.exists();
        if (!blobExists) {
            console.error(`Blob not found at path: ${filePath}`);
            return;
        }

        try {
            // Download the blob content
            const downloaded = await blockBlobClient.download();
            const blob: Blob = await downloaded.blobBody as Blob;
            const downloadedContent: string = await fileToText(new File([blob], 'result.json', { type: 'application/json' }));

            // Parse the JSON content (assuming the file is in JSON format)
            const resultJson = JSON.parse(downloadedContent);
            // console.log('Downloaded content:', resultJson);

            return resultJson;
        } catch (error) {
            console.error(error);
        }
        return null;
    }

    public async fetchTestReport(appName: string, runId: string) {
        const filePath = `${chalishaReporterPrefixPath}/${appName}/${runId}/report.json`;
        return await this.fetchJsonFile(filePath);
    }

    public async fetchTestResult(appName: string, runId: string) {
        const filePath = `${chalishaReporterPrefixPath}/${appName}/${runId}/result.json`;
        return await this.fetchJsonFile(filePath);
    }

    private async loadFoldersInPath(prefixPath: string) {
        if (this.settingsService.sasUrl && this.settingsService.account && this.settingsService.container && this.settingsService.sasToken) {
            const blobServiceClient = new BlobServiceClient(this.settingsService.sasUrl);
            const containerClient = blobServiceClient.getContainerClient(this.settingsService.container);
            let iter = containerClient.listBlobsByHierarchy('/', { prefix: `${prefixPath}/` });
            let folderSet = new Set<string>();
            for await (const item of iter) {
                if (item.kind === 'prefix') {
                    let folder = item.name.split('/').filter(o => o).pop();
                    if (folder) {
                        folderSet.add(folder);
                    }
                } else {
                }
            }
            return Array.from(folderSet);
        }
    }
}


