import { openDialog } from "@cloudparker/moldex.js";
import * as SDK from "azure-devops-extension-sdk";

let store: ReminderType[] = [];

const documentOptions: any = {
    // scopeType: "Collection"
};

export type ReminderType = {
    id?: string;
    title?: string,
    comment?: string;
    date?: Date;
    cat?: Date,
    uat?: Date;
    cby?: string;
    uby?: string;
    cbyn?: string;
    ubyn?: string;
}

let collectionName = "cloudparker.cp-reminders";


// Initialize the ExtensionDataManager for future use
async function getDataService(): Promise<any> {
    await SDK.ready();
    const accessToken = await SDK.getAccessToken();
    const extDataService = await SDK.getService<any>('ms.vss-features.extension-data-service');
    let _dataManager = await extDataService.getExtensionDataManager(SDK.getExtensionContext().id, accessToken);



    // let contributionId = SDK.getContributionId();
    // console.log('contributionId', contributionId,  _dataManager)
    // const dataService = await SDK.getService<any>(contributionId);

    return _dataManager;
}

export async function isAdminUser() {
    let dataService = await getDataService();
    console.log('isAdminUser', SDK.getUser())
}


export async function getUserScopedValue(key: string): Promise<any> {
    try {
        const dataService = await getDataService()
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
        const dataService = await getDataService();
        await dataService.setValue(key, value, { scopeType: "User" });
    } catch (error) {
        console.error(`Error setting user-scoped value for key ${key}:`, error);
    }
}

// Create a document in organization scope
export async function createReminder(reminder: ReminderType) {
    if (reminder?.date) {
        reminder.id = crypto.randomUUID();
        reminder.cat = new Date(); // created at
        reminder.uat = new Date(); // updated at
        let user = SDK.getUser();
        if (user) {
            reminder.cby = user.descriptor;
            reminder.uby = user.descriptor;
            reminder.cbyn = user.displayName;
            reminder.ubyn = user.displayName;
        }
        if (import.meta.env.DEV) {
            store.push(reminder);
        } else {
            const manager = await getDataService();
            await manager.createDocument(collectionName, reminder, documentOptions);
        }
    }

    return reminder;
}

// Update a document in organization scope
export async function updateReminder(reminder: ReminderType) {
    if (reminder?.date && reminder?.id) {
        reminder.uat = new Date(); // updated at
        let user = SDK.getUser();
        if (user) {
            reminder.uby = user.descriptor;
            reminder.ubyn = user.displayName;
        }
        if (import.meta.env.DEV) {
            let index = store.findIndex((o) => o.id == reminder.id);
            if (index >= 0) {
                store.splice(index, 1, reminder);
            }
        } else {
            const manager = await getDataService();
            await manager.updateDocument(collectionName, reminder, documentOptions);
        }
    }

    return reminder;
}

// Remove a document in organization scope
export async function removeReminder(reminder: ReminderType) {
    if (reminder?.id) {
        if (import.meta.env.DEV) {
            let index = store.findIndex((o) => o.id == reminder.id);
            if (index >= 0) {
                store.splice(index, 1);
            }
        } else {
            const manager = await getDataService();
            await manager.deleteDocument(collectionName, reminder.id, documentOptions);
        }
    }

    return reminder;
}

// Get a single document in organization scope
export async function getReminderById(reminderId: string) {
    if (import.meta.env.DEV) {
        return store.find((reminder) => reminder.id === reminderId);
    } else {
        const manager = await getDataService();
        try {
            const reminder = await manager.getDocument(collectionName, reminderId, documentOptions);
            return reminder;
        } catch (error) {
            console.error("Error fetching reminder:", error);
            return null;
        }
    }
}

// Get all documents in organization scope
export async function getAllReminders() {
    if (import.meta.env.DEV) {
        return store;
    } else {
        try {
            const manager = await getDataService();
            return await manager.getDocuments(collectionName, documentOptions);
        } catch (error) {
            console.error(error);
        }
        return []
    }
}
