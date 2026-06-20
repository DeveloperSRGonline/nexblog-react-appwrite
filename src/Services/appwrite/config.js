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
               appwriteConfig.appwriteDatabaseID,
               appwriteConfig.appwriteCollectionId,
               slug,
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

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                appwriteConfig.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                appwriteConfig.appwriteStorageId,
                fileId
            )
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId){
        if (!fileId) return "";
        return this.storage.getFileView(
            appwriteConfig.appwriteStorageId,
            fileId
        )
    }
}


const service = new Service()
export default service;

