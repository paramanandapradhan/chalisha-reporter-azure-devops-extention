import type { SettingsService } from "./settings.service";


export async function syncReports(settingsService: SettingsService) {
    if (settingsService && settingsService.hasBlobSasTokenUrl()) {
        let blobUrl = settingsService.getBlobUrl();
        let sasToken = settingsService.getBlobSasToken();
        if(blobUrl && sasToken){
            
        }
    }
}