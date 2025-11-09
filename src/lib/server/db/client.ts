import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

if (!DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres connection with serverless-friendly configuration
// For Vercel and other serverless platforms, we need to limit connections
const client = postgres(DATABASE_URL, {
	max: 1, // Limit to 1 connection per serverless function instance
	idle_timeout: 20, // Close idle connections after 20 seconds
	connect_timeout: 10, // Fail fast if connection takes too long
	prepare: false // Disable prepared statements for connection pooling compatibility
});

// Create drizzle instance
export const db = drizzle(client, { schema });
