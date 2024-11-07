const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
        databaseId: String(process.env.APPWRITE_DATABASE_ID),
        bucketId: String(process.env.APPWRITE_STORAGE_BUCKET_ID),
    }
}

export default env;