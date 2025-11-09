import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Use dynamic env which works better in serverless environments
const DATABASE_URL = env.DATABASE_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
	console.error('Environment check:', {
		hasEnvDatabaseUrl: !!env.DATABASE_URL,
		hasProcessEnvDatabaseUrl: !!process.env.DATABASE_URL,
		envKeys: Object.keys(env),
		processEnvKeys: Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('SUPABASE'))
	});
	throw new Error('DATABASE_URL environment variable is not set. Check Vercel environment variables.');
}

console.log('Database connection info:', {
	hasUrl: !!DATABASE_URL,
	urlPrefix: DATABASE_URL.substring(0, 20) + '...',
	isProduction: process.env.NODE_ENV === 'production'
});

// Create postgres connection with serverless-friendly configuration
// For Vercel and other serverless platforms, we need to limit connections
const client = postgres(DATABASE_URL, {
	max: 1, // Limit to 1 connection per serverless function instance
	idle_timeout: 20, // Close idle connections after 20 seconds
	connect_timeout: 10, // Fail fast if connection takes too long
	prepare: false, // Disable prepared statements for connection pooling compatibility
	onnotice: () => {}, // Suppress notices
	debug: false
});

// Create drizzle instance
export const db = drizzle(client, { schema });
