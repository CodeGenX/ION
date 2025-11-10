<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';
	import ProgressRing from '$lib/components/ui/ProgressRing.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'valueDelivery'],
		queryFn: () => trpc.dashboard.getValueDelivery.query()
	});

	function formatCurrency(value: number): string {
		if (value >= 1000000) {
			return `$${(value / 1000000).toFixed(1)}M`;
		}
		if (value >= 1000) {
			return `$${(value / 1000).toFixed(0)}K`;
		}
		return `$${value.toFixed(0)}`;
	}
</script>

<Widget title="Value Delivery">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse">
			<div class="mb-4 flex justify-center">
				<div class="h-32 w-32 rounded-full bg-surface-200"></div>
			</div>
			<div class="h-6 rounded bg-surface-200"></div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load value delivery</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="mb-4 flex justify-center">
			<ProgressRing percentage={$query.data.percentage} />
		</div>

		<div class="text-center">
			<div class="text-xl font-bold">
				{formatCurrency($query.data.deliveredValue)} of {formatCurrency($query.data.targetValue)}
			</div>
			<div class="text-sm text-surface-600">Value Delivered</div>
		</div>
	{/if}
</Widget>
