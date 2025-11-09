import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	// If logged in, redirect to dashboard
	if (session) {
		throw redirect(303, '/dashboard');
	}

	// Otherwise redirect to login
	throw redirect(303, '/login');
};
