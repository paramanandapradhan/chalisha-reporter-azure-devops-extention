import { getDefaultScopedValue, setDefaultScopedValue } from "./data.service";


const KEY_SETTINGS_SERVICE = 'cp-chalisha-reporter.settings'
const KEY_REPORT_SERVICE = 'cp-chalisha-reporter.settings'

export const KEY_SETTINGS_SERVICE_CONTEXT = Symbol(KEY_SETTINGS_SERVICE);
export const KEY_REPORT_SERVICE_CONTEXT = Symbol(KEY_REPORT_SERVICE);


export type SettingType = {
    blobStorageAccount?: string;
    blobStorageContainer?: string;
    blobStorageSasToken?: string;
}


export class SettingsService {

    settings: SettingType = {};

    constructor() {
    }

    async load() {
        this.settings = await getDefaultScopedValue(KEY_SETTINGS_SERVICE) || null;
        return this;
    }

    async setSettings(value: SettingType) {
        try {
            await setDefaultScopedValue(KEY_SETTINGS_SERVICE, value);
            await this.load();
        } catch (error) {
            console.error(error);
        }
    }

    get hasRequiredSettings(): boolean {
        if (this.settings) {
            return !!(this.settings.blobStorageAccount && this.settings.blobStorageContainer && this.settings.blobStorageSasToken);
        }
        return false;
    }

    get sasUrl(): string | null {
        if (this.settings) {
            return `https://${this.settings.blobStorageAccount}.blob.core.windows.net?${this.settings.blobStorageSasToken}`;
        }
        return null;
    }

    get blobHost(): string | null {
        if (this.settings) {
            return `https://${this.settings.blobStorageAccount}.blob.core.windows.net`;
        }
        return null;
    }


    get sasToken() {
        return this.settings.blobStorageSasToken || null
    }

    get container() {
        return this.settings.blobStorageContainer || null
    }

    get account() {
        return this.settings.blobStorageAccount || null
    }


    // sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupiytfx&se=2025-05-14T22:34:59Z&st=2024-10-05T14:34:59Z&spr=https&sig=PKv0YzdQTiiA0oaOFPMMx9r3hho6GbQmSVTkGx5cONM%3D
}