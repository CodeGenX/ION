import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Use dynamic env which works better in serverless environments
function getDatabaseUrl(): string {
	const url = env.DATABASE_URL || process.env.DATABASE_URL;

	if (!url) {
		const envInfo = {
			hasEnvDatabaseUrl: !!env.DATABASE_URL,
			hasProcessEnvDatabaseUrl: !!process.env.DATABASE_URL,
			nodeEnv: process.env.NODE_ENV,
			vercelEnv: process.env.VERCEL_ENV,
			availableEnvKeys: Object.keys(env).join(', '),
			availableProcessKeys: Object.keys(process.env)
				.filter((k) => k.includes('DATABASE') || k.includes('SUPABASE') || k.includes('VERCEL'))
				.join(', ')
		};

		console.error('❌ DATABASE_URL not found!', JSON.stringify(envInfo, null, 2));
		throw new Error(
			`DATABASE_URL environment variable is not set. ` +
				`Available env keys: ${envInfo.availableEnvKeys}. ` +
				`Check Vercel Dashboard → Settings → Environment Variables`
		);
	}

	console.log('✅ Database URL found:', {
		source: env.DATABASE_URL ? '$env/dynamic/private' : 'process.env',
		urlPrefix: url.substring(0, 25) + '...',
		urlLength: url.length,
		isProduction: process.env.NODE_ENV === 'production',
		vercelEnv: process.env.VERCEL_ENV
	});

	return url;
}

// Create a single postgres client for the module
// In serverless, this will be created once per cold start and reused
const DATABASE_URL = getDatabaseUrl();

console.log('🔌 Initializing postgres client for serverless...');

// Create postgres connection optimized for Vercel serverless
// Key settings for serverless compatibility:
// - max: 1 (one connection per function instance)
// - prepare: false (required for connection poolers)
const client = postgres(DATABASE_URL, {
	max: 1,
	prepare: false,
	fetch_types: false,
	transform: {
		undefined: null
	},
	// Add explicit error handler
	onnotice: () => {},
	// Enable connection for transaction pooling mode
	connection: {
		application_name: 'ion-vercel'
	}
});

console.log('✅ Postgres client initialized');

// Test the connection immediately
(async () => {
	try {
		console.log('🧪 Testing database connection...');
		await client`SELECT 1 as test`;
		console.log('✅ Database connection test successful');
	} catch (error) {
		console.error('❌ Database connection test failed:', {
			message: error instanceof Error ? error.message : String(error),
			code: (error as any)?.code,
			errno: (error as any)?.errno
		});
	}
})();

// Create and export drizzle instance
export const db = drizzle(client, { schema });
