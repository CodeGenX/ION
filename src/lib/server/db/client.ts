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
			availableProcessKeys: Object.keys(process.env).filter(k =>
				k.includes('DATABASE') || k.includes('SUPABASE') || k.includes('VERCEL')
			).join(', ')
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

let cachedClient: postgres.Sql | null = null;

function getClient(): postgres.Sql {
	if (cachedClient) {
		return cachedClient;
	}

	const DATABASE_URL = getDatabaseUrl();

	try {
		console.log('🔌 Creating postgres client...');

		// Create postgres connection with serverless-friendly configuration
		cachedClient = postgres(DATABASE_URL, {
			max: 1, // Limit to 1 connection per serverless function instance
			idle_timeout: 20, // Close idle connections after 20 seconds
			connect_timeout: 10, // Fail fast if connection takes too long
			prepare: false, // Disable prepared statements for connection pooling compatibility
			onnotice: () => {}, // Suppress notices
			debug: false,
			// Add error handler
			onclose: () => console.log('🔌 Database connection closed'),
			connection: {
				application_name: 'ion-vercel'
			}
		});

		console.log('✅ Postgres client created successfully');
		return cachedClient;
	} catch (error) {
		console.error('❌ Failed to create postgres client:', error);
		throw error;
	}
}

// Create drizzle instance with lazy client
export const db = drizzle(getClient(), { schema });
