import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '$lib/server/trpc/router';
import { browser } from '$app/environment';

function getBaseUrl() {
	if (browser) return '';
	return `http://localhost:${process.env.PORT ?? 5173}`;
}

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`
		})
	]
});
