import { appwriteConfig } from "../../config";
import { Client,ID,Databases ,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(appwriteConfig.appwriteEndpoint)
            .setProject(appwriteConfig.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument  (
                databaseId = appwriteConfig.appwriteDatabaseID,
                collectionId = appwriteConfig.appwriteCollectionId,
                documentId = slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }
}


const service = new Service()
export default service;

