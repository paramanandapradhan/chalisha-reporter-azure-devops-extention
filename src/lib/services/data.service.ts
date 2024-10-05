
import * as SDK from "azure-devops-extension-sdk";


// Initialize the ExtensionDataManager for future use
export async function getDataServiceManager(): Promise<any> {
    await SDK.ready();
    const accessToken = await SDK.getAccessToken();
    const extDataService = await SDK.getService<any>('ms.vss-features.extension-data-service');
    let dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);

    return dataManager;
}


export async function getUserScopedValue(key: string): Promise<any> {
    try {
        const dataService = await getDataServiceManager()
        const value = await dataService.getValue(key, { scopeType: "User" });
        // console.log(`User-scoped key value is: ${value}`);
        return value;
    } catch (error) {
        console.error(`Error getting user-scoped value for key ${key}:`, error);
        return null;
    }
}

export async function setUserScopedValue(key: string, value: any): Promise<void> {
    try {
        const dataService = await getDataServiceManager();
        await dataService.setValue(key, value, { scopeType: "User" });
    } catch (error) {
        console.error(`Error setting user-scoped value for key ${key}:`, error);
    }
}


export async function getDefaultScopedValue(key: string): Promise<any> {
    try {
        const dataService = await getDataServiceManager()
        const value = await dataService.getValue(key);
        // console.log(`User-scoped key value is: ${value}`);
        return value;
    } catch (error) {
        console.error(`Error getting user-scoped value for key ${key}:`, error);
        return null;
    }
}

export async function setDefaultScopedValue(key: string, value: any): Promise<void> {
    try {
        const dataService = await getDataServiceManager();
        await dataService.setValue(key, value,);
    } catch (error) {
        console.error(`Error setting user-scoped value for key ${key}:`, error);
    }
}

