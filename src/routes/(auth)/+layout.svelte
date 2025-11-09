<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase/client';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();
	let sidebarOpen = $state(true);
	let aiPanelOpen = $state(false);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function handleLogout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function toggleAIPanel() {
		aiPanelOpen = !aiPanelOpen;
	}
</script>

<div class="flex h-screen overflow-hidden bg-surface-50">
	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-50 w-64 transform bg-surface-900 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="flex h-full flex-col">
			<!-- Logo -->
			<div class="flex h-16 items-center justify-between px-4">
				<h1 class="text-2xl font-bold text-white">ION</h1>
				<button
					class="lg:hidden text-white"
					onclick={toggleSidebar}
					aria-label="Close sidebar"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 space-y-1 px-2 py-4">
				<a
					href="/dashboard"
					class="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-surface-300 hover:bg-surface-800 hover:text-white"
				>
					<svg
						class="mr-3 h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Home
				</a>

				<a
					href="/portfolio"
					class="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-surface-300 hover:bg-surface-800 hover:text-white"
				>
					<svg
						class="mr-3 h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					Portfolio
				</a>

				<a
					href="/roadmap"
					class="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-surface-300 hover:bg-surface-800 hover:text-white"
				>
					<svg
						class="mr-3 h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
						/>
					</svg>
					Roadmap
				</a>

				<a
					href="/settings"
					class="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-surface-300 hover:bg-surface-800 hover:text-white"
				>
					<svg
						class="mr-3 h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Settings
				</a>
			</nav>
		</div>
	</aside>

	<!-- Main Content Area -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Top Bar -->
		<header class="flex h-16 items-center justify-between border-b border-surface-200 bg-white px-4 shadow-sm">
			<div class="flex items-center">
				<!-- Hamburger Menu (Mobile) -->
				<button
					class="mr-4 text-surface-500 lg:hidden"
					onclick={toggleSidebar}
					aria-label="Toggle sidebar"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			<div class="flex items-center space-x-4">
				<!-- AI Assistant Toggle -->
				<button
					class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-100"
					onclick={toggleAIPanel}
				>
					<svg
						class="mr-2 h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
						/>
					</svg>
					AI Assistant
				</button>

				<!-- User Menu -->
				<div class="flex items-center">
					<button
						onclick={handleLogout}
						class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-100"
					>
						<svg
							class="mr-2 h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						Logout
					</button>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<main class="flex-1 overflow-y-auto bg-surface-50 p-6">
			{@render children()}
		</main>
	</div>

	<!-- AI Assistant Panel (Slide-in from right) -->
	{#if aiPanelOpen}
		<div
			class="fixed inset-y-0 right-0 z-50 w-full transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-96 {aiPanelOpen
				? 'translate-x-0'
				: 'translate-x-full'}"
		>
			<div class="flex h-full flex-col">
				<!-- Panel Header -->
				<div class="flex h-16 items-center justify-between border-b border-surface-200 px-4">
					<h2 class="text-lg font-semibold text-surface-900">AI Assistant</h2>
					<button
						onclick={toggleAIPanel}
						class="text-surface-500 hover:text-surface-700"
						aria-label="Close AI panel"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- Panel Content -->
				<div class="flex-1 overflow-y-auto p-4">
					<div class="rounded-lg bg-surface-50 p-4 text-center">
						<svg
							class="mx-auto h-12 w-12 text-surface-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
						<p class="mt-2 text-sm text-surface-600">
							AI Assistant placeholder - Integration coming soon
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Overlay for mobile sidebar -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-40 bg-surface-600 bg-opacity-75 lg:hidden"
			onclick={toggleSidebar}
		></div>
	{/if}
</div>
