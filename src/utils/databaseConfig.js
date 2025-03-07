import pg from "pg";
import { logger } from "./logger";

const { Pool } = pg;

// Get connection string from environment variable
const connectionString = import.meta.env.VITE_DATABASE_URL;

// Create a database pool
const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false, // Required for Neon PostgreSQL
	},
});

// Test the connection
pool.on("connect", (client) => {
	logger.info("✅ PostgreSQL database connection established");
});

pool.on("error", (err) => {
	logger.error("❌ PostgreSQL pool error:", err);
});

export default {
	query: (text, params) => {
		logger.debug("🚀 Executing Query:", { text });
		return pool.query(text, params);
	},
	getClient: async () => {
		try {
			const client = await pool.connect();
			return client;
		} catch (err) {
			logger.error("❌ Error getting client from pool:", err);
			throw err;
		}
	},
};
