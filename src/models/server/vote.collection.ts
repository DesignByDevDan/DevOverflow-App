import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    // Creating Collection (C.R.U.D)
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Vote Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(
            db,
            voteCollection,
            "voteStatus",
            ["upvoted", "downvoted"],
            true
        ),
        databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
    ]);
    console.log("Vote Attributes Created");
}



// REFACTORED CODE FOR THE SINGLE DB USAGE


// import { Permission } from "node-appwrite";
// import { db, voteCollection } from "../name";
// import { databases } from "./config";

// export default async function createVoteCollection() {
//     try {
//         // Check if the collection already exists
//         const existingCollections = await databases.listCollections(db);
//         const collectionExists = existingCollections.collections.some(
//             (collection) => collection.$id === voteCollection
//         );

//         if (collectionExists) {
//             console.log("Vote Collection already exists.");
//             return;
//         }

//         // Create Collection (C.R.U.D)
//         await databases.createCollection(db, voteCollection, voteCollection, [
//             Permission.create("users"),
//             Permission.read("any"),
//             Permission.read("users"),
//             Permission.update("users"),
//             Permission.delete("users"),
//         ]);
//         console.log("Vote Collection Created");

//         // Creating Attributes
//         await Promise.all([
//             databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
//             databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
//             databases.createEnumAttribute(
//                 db,
//                 voteCollection,
//                 "voteStatus",
//                 ["upvoted", "downvoted"],
//                 true
//             ),
//             databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
//         ]);
//         console.log("Vote Attributes Created");

//     } catch (error) {
//         console.error("Error in creating vote collection: ", error);
//     }
// }
