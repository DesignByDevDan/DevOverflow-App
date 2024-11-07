import { Permission } from "node-appwrite";
// import { IndexType } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
    // Creating Collection (C.R.U.D)
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Answer Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    ]);
    console.log("Answer Attributes Created");
}




// REFACTORED CODE FOR THE SINGLE DB USAGE

// import { Permission } from "node-appwrite";
// import { answerCollection, db } from "../name";
// import { databases } from "./config";

// export default async function createAnswerCollection() {
//     try {
//         // Check if collection already exists
//         const existingCollections = await databases.listCollections(db);
//         const collectionExists = existingCollections.collections.some(
//             (collection) => collection.$id === answerCollection
//         );

//         if (collectionExists) {
//             console.log("Answer Collection already exists.");
//             return;
//         }

//         // Creating Collection (C.R.U.D)
//         await databases.createCollection(db, answerCollection, answerCollection, [
//             Permission.create("users"),
//             Permission.read("any"),
//             Permission.read("users"),
//             Permission.update("users"),
//             Permission.delete("users"),
//         ]);
//         console.log("Answer Collection Created");

//         // Creating Attributes
//         await Promise.all([
//             databases.createStringAttribute(db, answerCollection, "content", 10000, true),
//             databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
//             databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
//         ]);
//         console.log("Answer Attributes Created");

//     } catch (error) {
//         console.error("Error in creating answer collection: ", error);
//     }
// }
