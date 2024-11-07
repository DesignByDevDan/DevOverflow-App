import {Permission} from "node-appwrite"

import {db, questionCollection} from "../name"
import {databases} from "./config"


export default async function createQuestionCollection(){
  // create collection (C.R.U.D)
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])
  console.log("Question collection is created")

  //creating attributes and Indexes

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 10000, true),
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
  ]);
  console.log("Question Attributes created")

  // create Indexes

  /*
  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ['asc']
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ['asc']
    )
  ])
    */
}



// REFACTORED CODE FOR THE SINGLE DB USAGE

// import { Permission, IndexType } from "node-appwrite";
// import { db, questionCollection } from "../name";
// import { databases } from "./config";

// export default async function createQuestionCollection() {
//     try {
//         // Check if the collection already exists
//         const existingCollections = await databases.listCollections(db);
//         const collectionExists = existingCollections.collections.some(
//             (collection) => collection.$id === questionCollection
//         );

//         if (collectionExists) {
//             console.log("Question Collection already exists.");
//             return;
//         }

//         // Create Collection (C.R.U.D)
//         await databases.createCollection(db, questionCollection, questionCollection, [
//             Permission.read("any"),
//             Permission.read("users"),
//             Permission.create("users"),
//             Permission.update("users"),
//             Permission.delete("users"),
//         ]);
//         console.log("Question Collection Created");

//         // Creating Attributes
//         await Promise.all([
//             databases.createStringAttribute(db, questionCollection, "title", 100, true),
//             databases.createStringAttribute(db, questionCollection, "content", 10000, true),
//             databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
//             databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
//             databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
//         ]);
//         console.log("Question Attributes Created");

//         // Creating Indexes
//         await Promise.all([
//             databases.createIndex(
//                 db,
//                 questionCollection,
//                 "title",
//                 IndexType.Fulltext,
//                 ["title"],
//                 ["asc"]
//             ),
//             databases.createIndex(
//                 db,
//                 questionCollection,
//                 "content",
//                 IndexType.Fulltext,
//                 ["content"],
//                 ["asc"]
//             ),
//         ]);
//         console.log("Question Indexes Created");

//     } catch (error) {
//         console.error("Error in creating question collection: ", error);
//     }
// }
