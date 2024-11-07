import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    // Creating Collection (C.R.U.D)
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
    ]);
    console.log("Comment Attributes Created");
}



// REFACTORED CODE FOR THE SINGLE DB USAGE


// import { Permission } from "node-appwrite";
// import { commentCollection, db } from "../name";
// import { databases } from "./config";

// export default async function createCommentCollection() {
//     try {
//         // Check if collection already exists
//         const existingCollections = await databases.listCollections(db);
//         const collectionExists = existingCollections.collections.some(
//             (collection) => collection.$id === commentCollection
//         );

//         if (collectionExists) {
//             console.log("Comment Collection already exists.");
//             return;
//         }

//         // Creating Collection (C.R.U.D)
//         await databases.createCollection(db, commentCollection, commentCollection, [
//             Permission.create("users"),
//             Permission.read("any"),
//             Permission.read("users"),
//             Permission.update("users"),
//             Permission.delete("users"),
//         ]);
//         console.log("Comment Collection Created");

//         // Creating Attributes
//         await Promise.all([
//             databases.createStringAttribute(db, commentCollection, "content", 10000, true),
//             databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
//             databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
//             databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
//         ]);
//         console.log("Comment Attributes Created");

//     } catch (error) {
//         console.error("Error in creating comment collection: ", error);
//     }
// }
