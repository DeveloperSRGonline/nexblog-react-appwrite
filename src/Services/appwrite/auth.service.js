import { appwriteConfig } from "../../config";
import {Client,Account, ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(appwriteConfig.appwriteEndpoint)
            .setProject(appwriteConfig.appwriteProjectID);
        
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password)
            if(userAccount){
                // clall another method
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)
            return false;
        }

        return null;
    }

    async Logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService()

export default authService;