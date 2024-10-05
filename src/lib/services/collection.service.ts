import * as SDK from "azure-devops-extension-sdk";
import { getDataServiceManager } from "./data.service";
import { nanoid } from 'nanoid';


export type DocumentType<R> = {
    id?: string;
    cat?: number, // Created At
    uat?: number, // Updated At
    cby?: string, // Created By
    uby?: string, // Updated By
    data?: R; // any types of data
    date?: Date;
}

export class Collection<T  extends DocumentType<R>, R > {
    private name: string;
    private userScope?: boolean;
    private scope?: { scopeType: string }

    constructor(collectionName: string, userScope?: boolean) {
        this.name = collectionName;
        this.userScope = userScope;
        if (this.userScope) {
            this.scope = { scopeType: "User" }
        }
    }

    /**
    * Create a document in organization scope
    * */
    async createReminder(doc: T) {
        doc.id = nanoid();
        doc.cat = Date.now(); // created at
        doc.uat = Date.now(); // updated at
        let user = SDK.getUser();
        if (user) {
            doc.cby = user.descriptor;
            doc.uby = user.descriptor;
        }
        const manager = await getDataServiceManager();
        await manager.createDocument(this.name, doc, this.scope);

        return doc;
    }


    /**
     * Create a new document in the collection
     * @param doc - The document to create
     */
    async createDocument(doc: T): Promise<T> {
        doc.id = crypto.randomUUID(); // Generate a unique ID for the document
        doc.cat = Date.now(); // Set created at timestamp
        doc.uat = Date.now(); // Set updated at timestamp

        const user = SDK.getUser(); // Get the current user information
        if (user) {
            doc.cby = user.descriptor; // Created By user descriptor
            doc.uby = user.descriptor; // Updated By user descriptor
        }

        const manager = await getDataServiceManager();
        await manager.createDocument(this.name, doc, this.scope); // Create the document in the collection

        return doc;
    }

    /**
     * Update an existing document in the collection
     * @param doc - The document to update
     */
    async updateDocument(doc: T): Promise<T | null> {
        if (!doc.id) return null; // Return null if document ID is not provided
        doc.uat = Date.now(); // Set updated at timestamp

        const user = SDK.getUser(); // Get the current user information
        if (user) {
            doc.uby = user.descriptor; // Updated By user descriptor
        }

        const manager = await getDataServiceManager();
        await manager.updateDocument(this.name, doc, this.scope); // Update the document in the collection

        return doc;
    }

    /**
     * Remove a document from the collection by its ID
     * @param docId - The ID of the document to remove
     */
    async removeDocument(docId: string): Promise<boolean> {
        if (!docId) return false; // Return false if document ID is not provided

        const manager = await getDataServiceManager();
        await manager.deleteDocument(this.name, docId, this.scope); // Delete the document from the collection

        return true;
    }

    /**
     * Get a document by its ID from the collection
     * @param docId - The ID of the document to retrieve
     */
    async getDocumentById(docId: string): Promise<T | null> {
        if (!docId) return null; // Return null if document ID is not provided

        const manager = await getDataServiceManager();
        try {
            const doc = await manager.getDocument(this.name, docId, this.scope); // Retrieve the document by ID
            return doc as T; // Cast and return the document
        } catch (error) {
            console.error("Error fetching document:", error);
            return null;
        }
    }

    /**
     * Get all documents from the collection
     */
    async getAllDocuments(): Promise<T[]> {
        const manager = await getDataServiceManager();
        try {
            const docs = await manager.getDocuments(this.name, this.scope); // Retrieve all documents in the collection
            return docs as T[]; // Cast and return the array of documents
        } catch (error) {
            // console.error("Error fetching all documents:", error);
            return []; // Return an empty array if an error occurs
        }
    }
}

