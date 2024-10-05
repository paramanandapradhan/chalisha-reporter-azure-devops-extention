import { getDefaultScopedValue, setDefaultScopedValue } from "./data.service";


const KEY_SETTINGS = 'cp-chalisha-reporter.settings'

export const KEY_SETTINGS_CONTEXT = Symbol(KEY_SETTINGS);

export type SettingType = {
    blobSasUrl?: string;
}


export class SettingsService {

    settings: any = null;

    constructor() {
    }

    async load() {
        this.settings = await getDefaultScopedValue(KEY_SETTINGS) || null;
        return this;
    }

    async setSettings(value: SettingType) {
        try {
            await setDefaultScopedValue(KEY_SETTINGS, value);
            await this.load();
        } catch (error) {
            console.error(error);
        }
    }

    hasBlobSasTokenUrl(): boolean {
        if (this.settings) {
            return !!this.settings.blobSasUrl;
        }
        return false;
    }

    getBlobSasTokenUrl(): string | null {
        if (this.settings) {
            return this.settings.blobSasUrl;
        }
        return null;
    }

    getBlobUrl(): string | null {
        if (this.settings?.blobSasUrl) {
            try {
                const blobUrl = new URL(this.settings.blobSasUrl);
                blobUrl.search = "";
                return blobUrl.href;
            } catch (error) {
                console.error("Failed to parse Blob URL:", error);
                return null;
            }
        }
        return null;
    }

    getBlobSasToken(): string | null {
        if (this.settings?.blobSasUrl) {
            try {
                const blobUrl = new URL(this.settings.blobSasUrl);
                const sasToken = blobUrl.search;
                return sasToken ? sasToken : null;
            } catch (error) {
                console.error("Failed to parse Blob SAS Token:", error);
                return null;
            }
        }

        return null;
    }
}