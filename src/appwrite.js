import { Client, TablesDB, ID, Query } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_TABLE_ID;

//Define new Appwrite Client
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {

        //Get the current search count if it exists then update
        const result = await database.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [Query.equal("searchTerm", searchTerm)]
        });

        console.log("Appwrite result:", result);
        const searchResults = result.rows;

        if (searchResults.length > 0) {
            //searchTerm exists, update the count
            const doc = searchResults[0];
            await database.updateRow(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1
            });
            console.log(`Search count updated to ${doc.count + 1}`);

        }
        //If not, create a new one
        else {
            await database.createRow(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(`Error updating search count: ${error}`);
    }
};
