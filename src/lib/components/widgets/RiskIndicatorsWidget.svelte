<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'risks'],
		queryFn: () => trpc.dashboard.getRisks.query()
	});

	function getSeverityColor(severity: string): string {
		switch (severity) {
			case 'critical':
				return 'bg-error-100 text-error-800 border-error-300';
			case 'high':
				return 'bg-warning-100 text-warning-800 border-warning-300';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800 border-yellow-300';
			default:
				return 'bg-surface-100 text-surface-800 border-surface-300';
		}
	}

	function getSeverityLabel(severity: string): string {
		return severity.charAt(0).toUpperCase() + severity.slice(1);
	}
</script>

<Widget title="Risk Indicators">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse space-y-3">
			<div class="h-16 rounded bg-surface-200"></div>
			<div class="h-16 rounded bg-surface-200"></div>
			<div class="h-16 rounded bg-surface-200"></div>
			<div class="h-16 rounded bg-surface-200"></div>
			<div class="h-16 rounded bg-surface-200"></div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load risks</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="space-y-3">
			{#each $query.data as risk}
				<div
					class="rounded-lg border-l-4 p-3 transition-colors hover:bg-surface-50 {getSeverityColor(
						risk.severity
					)}"
				>
					<div class="mb-1 flex items-center justify-between">
						<span class="text-xs font-medium uppercase">{getSeverityLabel(risk.severity)}</span>
					</div>
					<div class="text-sm font-medium">{risk.title}</div>
					{#if risk.description}
						<div class="mt-1 text-xs text-surface-600">{risk.description}</div>
					{/if}
				</div>
			{/each}

			{#if $query.data.length === 0}
				<div class="py-8 text-center text-sm text-surface-600">No active risks identified</div>
			{/if}
		</div>
	{/if}
</Widget>
