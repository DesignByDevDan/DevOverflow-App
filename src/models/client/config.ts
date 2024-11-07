import env from "@/app/env";

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) //  API Endpoint
    .setProject(env.appwrite.projectId); // Appwrite project ID


const databases = new Databases(client);
const avatars = new Avatars(client);
const account = new Account(client);
const storage = new Storage(client);


export { client, databases, avatars, account, storage };