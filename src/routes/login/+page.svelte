<script lang="ts">
	import { supabase } from '$lib/supabase/client';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleLogin() {
		if (!email || !password) {
			error = 'Please enter both email and password';
			return;
		}

		loading = true;
		error = '';

		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		loading = false;

		if (signInError) {
			error = signInError.message;
		} else {
			goto('/dashboard');
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-surface-50 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="text-center text-3xl font-bold tracking-tight text-surface-900">
				Sign in to ION
			</h2>
			<p class="mt-2 text-center text-sm text-surface-600">
				Product Portfolio Management & Delivery Intelligence
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
			{#if error}
				<div class="rounded-md bg-error-50 p-4">
					<p class="text-sm text-error-800">{error}</p>
				</div>
			{/if}

			<div class="space-y-4 rounded-md shadow-sm">
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
						class="input"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						bind:value={password}
						class="input"
						placeholder="Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={loading}
					class="btn variant-filled-primary w-full"
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>
	</div>
</div>
