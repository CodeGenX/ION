import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		environment: 'node',
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/lib/server/trpc/**/*.ts']
		}
	}
});
