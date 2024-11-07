import env from "@/app/env";

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key

    const databases = new Databases(client);
    const avatars = new Avatars(client);
    const storage = new Storage(client);
    const users = new Users(client);
    
    
    export { client, databases, avatars, storage, users };


// REFACTORED CODE FOR THE SINGLE DB USAGE

// import env from "@/app/env";
// import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

// const client = new Client();

// client
//   .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
//   .setProject(env.appwrite.projectId) // Your project ID
//   .setKey(env.appwrite.apikey) // Your secret API key

// const databases = new Databases(client);
// const avatars = new Avatars(client);
// const storage = new Storage(client);
// const users = new Users(client);

// // Use a single database ID throughout
// const DATABASE_ID = env.appwrite.databaseId || process.env.APPWRITE_DATABASE_ID;

// export { client, databases, avatars, storage, users, DATABASE_ID };
