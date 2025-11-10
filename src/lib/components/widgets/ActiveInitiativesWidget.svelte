<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';
	import StatusPill from '$lib/components/ui/StatusPill.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'activeInitiatives'],
		queryFn: () => trpc.dashboard.getActiveInitiatives.query()
	});
</script>

<Widget title="Active Initiatives">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse space-y-3">
			<div class="h-8 rounded bg-surface-200"></div>
			<div class="h-12 rounded bg-surface-200"></div>
			<div class="h-12 rounded bg-surface-200"></div>
			<div class="h-12 rounded bg-surface-200"></div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load active initiatives</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="mb-4 text-center">
			<div class="text-3xl font-bold">{$query.data.count}</div>
			<div class="text-sm text-surface-600">Active Initiatives</div>
		</div>

		<div class="space-y-2">
			{#each $query.data.initiatives as initiative}
				<div
					class="flex items-center justify-between rounded-lg border border-surface-200 p-3 transition-colors hover:bg-surface-50"
				>
					<div class="flex-1">
						<div class="text-sm font-medium">{initiative.name}</div>
					</div>
					<StatusPill status={initiative.ragStatus} />
				</div>
			{/each}
		</div>
	{/if}
</Widget>
