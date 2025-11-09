import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();

	// If no session and not already on login page, redirect to login
	if (!session && url.pathname !== '/login') {
		throw redirect(303, '/login');
	}

	return {
		session
	};
};
