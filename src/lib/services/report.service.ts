import type { SettingsService } from "./settings.service";
import { BlobServiceClient } from '@azure/storage-blob';
const chalishaReporterPrefixPath = 'chalisha-reporter/'; // Path to list the folders (inside the 'reports' container)


export class ReportService {
    settingsService: SettingsService;
    appNames: string[] = [];

    constructor(settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    async load() {
        if (this.settingsService && this.settingsService.hasRequiredSettings) {
            this.appNames = await this.loadFoldersInPath(chalishaReporterPrefixPath) || [];
            console.log('appNames', this.appNames );

            if(this.appNames ){
                
            }
        }
        return this;
    }


    private async loadFoldersInPath(prefixPath: string) {
        if (this.settingsService.sasUrl && this.settingsService.account && this.settingsService.container && this.settingsService.sasToken) {
            const blobServiceClient = new BlobServiceClient(this.settingsService.sasUrl);
            const containerClient = blobServiceClient.getContainerClient(this.settingsService.container);
            let iter = containerClient.listBlobsByHierarchy('/', { prefix: prefixPath });
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


