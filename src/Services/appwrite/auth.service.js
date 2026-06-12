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
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService()

export default authService;