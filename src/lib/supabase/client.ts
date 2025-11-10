import { createBrowserClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	global: {
		fetch
	},
	cookies: {
		get(name) {
			if (!isBrowser()) return '';
			return document.cookie
				.split('; ')
				.find((row) => row.startsWith(`${name}=`))
				?.split('=')[1] || '';
		},
		set(name, value, options) {
			if (!isBrowser()) return;
			document.cookie = `${name}=${value}; path=${options.path || '/'}; max-age=${options.maxAge || 31536000}`;
		},
		remove(name, options) {
			if (!isBrowser()) return;
			document.cookie = `${name}=; path=${options.path || '/'}; max-age=0`;
		}
	}
});
