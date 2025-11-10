import type { RequestEvent } from '@sveltejs/kit';
import { db } from '../db/client';

export async function createContext(event: RequestEvent) {
	return {
		db,
		event
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
