import { databases } from "./config";
import { ID } from "appwrite";

const db = {};

// Validate required environment variables
const requiredEnvVars = [
	"VITE_APPWRITE_DATABASE_ID",
	"VITE_APPWRITE_QUOTES_COLLECTION_ID",
	"VITE_APPWRITE_PERSONAL_DETAILS_COLLECTION_ID",
	"VITE_APPWRITE_INSURANCE_TYPES_COLLECTION_ID",
	"VITE_APPWRITE_VEHICLE_DETAILS_COLLECTION_ID",
	"VITE_APPWRITE_PROPERTY_DETAILS_COLLECTION_ID",
	"VITE_APPWRITE_LIFE_INSURANCE_DETAILS_COLLECTION_ID",
	"VITE_APPWRITE_BUSINESS_DETAILS_COLLECTION_ID",
	"VITE_APPWRITE_TERMS_COLLECTION_ID",
];

// Check for missing environment variables during initialization
requiredEnvVars.forEach((varName) => {
	if (!import.meta.env[varName]) {
		console.warn(`WARNING: Missing environment variable ${varName}`);
	}
});

const collections = [
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_QUOTES_COLLECTION_ID,
		name: "quotes",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_PERSONAL_DETAILS_COLLECTION_ID,
		name: "personalDetails",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_INSURANCE_TYPES_COLLECTION_ID,
		name: "insuranceTypes",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_VEHICLE_DETAILS_COLLECTION_ID,
		name: "vehicleDetails",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_PROPERTY_DETAILS_COLLECTION_ID,
		name: "propertyDetails",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_LIFE_INSURANCE_DETAILS_COLLECTION_ID,
		name: "lifeInsuranceDetails",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_BUSINESS_DETAILS_COLLECTION_ID,
		name: "businessDetails",
	},
	{
		dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
		id: import.meta.env.VITE_APPWRITE_TERMS_COLLECTION_ID,
		name: "termsAgreement",
	},
];

collections.forEach((col) => {
	// Skip collections with missing IDs
	if (!col.dbId || !col.id) {
		console.warn(
			`Skipping collection setup for ${col.name} due to missing database or collection ID`
		);
		return;
	}

	db[col.name] = {
		create: (payload, permissions, id = ID.unique()) =>
			databases.createDocument(col.dbId, col.id, id, payload, permissions),
		update: (id, payload, permissions) =>
			databases.updateDocument(col.dbId, col.id, id, payload, permissions),
		delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

		list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

		get: (id) => databases.getDocument(col.dbId, col.id, id),
	};
});

export default db;
