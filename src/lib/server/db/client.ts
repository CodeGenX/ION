import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Use dynamic env which works better in serverless environments
function getDatabaseUrl(): string {
	const url = env.DATABASE_URL || process.env.DATABASE_URL;

	if (!url) {
		throw new Error(
			'DATABASE_URL environment variable is not set. ' +
				'Check Vercel Dashboard → Settings → Environment Variables'
		);
	}

	return url;
}

// Create a single postgres client for the module
// In serverless, this will be created once per cold start and reused
const DATABASE_URL = getDatabaseUrl();

// Create postgres connection optimized for Vercel serverless
// Key settings for serverless compatibility:
// - max: 1 (one connection per function instance)
// - prepare: false (required for connection poolers like Supabase Transaction mode)
const client = postgres(DATABASE_URL, {
	max: 1,
	prepare: false,
	fetch_types: false,
	transform: {
		undefined: null
	}
});

// Create and export drizzle instance
export const db = drizzle(client, { schema });
