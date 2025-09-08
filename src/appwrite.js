import { Client, Databases, ID, Query } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

//Define new Appwrite Client
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {

        //1. Get the current search count if it exists then update
        const response = await database.getDocument(
            DATABASE_ID,
            COLLECTION_ID,
            {queries: [Query.equal("searchTerm", searchTerm)]}
        );
        const documents = response.documents;

        if (documents.length > 0) {
            // Document exists, we can update it
            const doc = documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                searchCount: doc.searchCount + 1
            });
            console.log(`Search count updated to ${doc.searchCount + 1}`);

        }
        //2. If no document exists, create a new one
        else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                searchCount: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(`Error updating search count: ${error}`);
    }
};
