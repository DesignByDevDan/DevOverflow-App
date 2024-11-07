import Pagination from "@/components/Pagination";
import { MarkdownPreview } from "@/components/RTE";
import { answerCollection, db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import slugify from "@/utils/slugify";
import Link from "next/link";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
    params,
    searchParams,
}: {
    params: { userId: string; userSlug: string };
    searchParams: { page?: string };
}) => {

    // Ensure params are correctly passed and awaited
    console.log("Params:", params);

    if (!params || !params.userId) {
        // Fallback if params are not defined
        return <p>Loading...</p>;
    }

    // Simulate an asynchronous operation if needed
    const resolvedSearchParams = await new Promise<{ page?: string }>((resolve) => {
        setTimeout(() => resolve(searchParams), 100); // Simulate async operation
    });

    resolvedSearchParams.page ||= "1";

    // Ensure params.userId is awaited before using its properties
    const userId = await new Promise<string>((resolve) => {
        setTimeout(() => resolve(params.userId), 100); // Simulate async operation
    });

    const queries = [
        Query.equal("authorId", userId),
        Query.orderDesc("$createdAt"),
        Query.offset((+resolvedSearchParams.page - 1) * 25),
        Query.limit(25),
    ];

    const answers = await databases.listDocuments(db, answerCollection, queries);

    answers.documents = await Promise.all(
        answers.documents.map(async ans => {
            const question = await databases.getDocument(db, questionCollection, ans.questionId, [
                Query.select(["title"]),
            ]);
            return { ...ans, question };
        })
    );

    return (
        <div className="px-4">
            <div className="mb-4">
                <p>{answers.total} answers</p>
            </div>
            <div className="mb-4 max-w-3xl space-y-6">
                {answers.documents.map(ans => (
                    <div key={ans.$id}>
                        <div className="max-h-40 overflow-auto">
                            <MarkdownPreview source={ans.content} className="rounded-lg p-4" />
                        </div>
                        <Link
                            href={`/questions/${ans.questionId}/${slugify(ans.question.title)}`}
                            className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
                        >
                            Question
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination total={answers.total} limit={25} />
        </div>
    );
};

export default Page;


// src/app/users/[userId]/[userSlug]/answers/page.tsx

// import Pagination from "@/components/Pagination";
// import { MarkdownPreview } from "@/components/RTE";
// import { answerCollection, db, questionCollection } from "@/models/name";
// import { databases } from "@/models/server/config";
// import slugify from "@/utils/slugify";
// import Link from "next/link";
// import { Query } from "node-appwrite";
// import React from "react";

// const Page = async ({
//     params,
//     searchParams,
// }: {
//     params: { userId: string; userSlug: string };
//     searchParams: { page?: string };
// }) => {
//     // Ensure that params and searchParams are properly resolved before use
//     const userId = params?.userId;
//     const userSlug = params?.userSlug;
//     const page = searchParams?.page || "1";

//     if (!userId || !userSlug) {
//         return <p>Loading...</p>; // Fallback if params are not defined
//     }

//     // Construct queries based on userId
//     const queries = [
//         Query.equal("authorId", userId),
//         Query.orderDesc("$createdAt"),
//         Query.offset((+page - 1) * 25),
//         Query.limit(25),
//     ];

//     // Fetch answers based on the queries
//     const answers = await databases.listDocuments(db, answerCollection, queries);

//     answers.documents = await Promise.all(
//         answers.documents.map(async (ans) => {
//             const question = await databases.getDocument(db, questionCollection, ans.questionId, [
//                 Query.select(["title"]),
//             ]);
//             return { ...ans, question };
//         })
//     );

//     return (
//         <div className="px-4">
//             <div className="mb-4">
//                 <p>{answers.total} answers</p>
//             </div>
//             <div className="mb-4 max-w-3xl space-y-6">
//                 {answers.documents.map((ans) => (
//                     <div key={ans.$id}>
//                         <div className="max-h-40 overflow-auto">
//                             <MarkdownPreview source={ans.content} className="rounded-lg p-4" />
//                         </div>
//                         <Link
//                             href={`/questions/${ans.questionId}/${slugify(ans.question.title)}`}
//                             className="mt-3 inline-block shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
//                         >
//                             Question
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             <Pagination total={answers.total} limit={25} />
//         </div>
//     );
// };

// export default Page;
