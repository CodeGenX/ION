<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';
	import StatusPill from '$lib/components/ui/StatusPill.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'portfolioHealth'],
		queryFn: () => trpc.dashboard.getPortfolioHealth.query()
	});
</script>

<Widget title="Portfolio Health">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse">
			<div class="mb-4 h-8 rounded bg-surface-200"></div>
			<div class="mb-2 h-6 rounded bg-surface-200"></div>
			<div class="h-6 rounded bg-surface-200"></div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load portfolio health</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="mb-4 text-center">
			<div class="text-4xl font-bold">{$query.data.total}</div>
			<div class="text-sm text-surface-600">Total Initiatives</div>
		</div>

		<div class="flex justify-around">
			<div class="text-center">
				<StatusPill status="red">{$query.data.red}</StatusPill>
				<div class="mt-1 text-xs">
					{Math.round(($query.data.red / $query.data.total) * 100)}%
				</div>
			</div>

			<div class="text-center">
				<StatusPill status="amber">{$query.data.amber}</StatusPill>
				<div class="mt-1 text-xs">
					{Math.round(($query.data.amber / $query.data.total) * 100)}%
				</div>
			</div>

			<div class="text-center">
				<StatusPill status="green">{$query.data.green}</StatusPill>
				<div class="mt-1 text-xs">
					{Math.round(($query.data.green / $query.data.total) * 100)}%
				</div>
			</div>
		</div>
	{/if}
</Widget>
