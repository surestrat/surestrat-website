import { Client, Databases, Storage } from "appwrite";

// Environment variables
export const APPWRITE_ENDPOINT =
	import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Check for missing required environment variables
if (!APPWRITE_PROJECT_ID) {
	console.error(
		"Missing required environment variable: VITE_APPWRITE_PROJECT_ID"
	);
}

// Initialize Appwrite Client
const client = new Client();

// Set the endpoint and project
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export the client as default
export default client;
