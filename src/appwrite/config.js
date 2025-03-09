import { Client, Databases, Storage } from "appwrite";

// Initialize Appwrite Client
const client = new Client();

// Set the endpoint and project
client
	.setEndpoint(
		import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
	)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
