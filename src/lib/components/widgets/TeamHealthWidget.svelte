<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'teamHealth'],
		queryFn: () => trpc.dashboard.getTeamHealth.query()
	});

	function getColorForScore(score: number): string {
		if (score >= 75) return '#10B981'; // Green
		if (score >= 50) return '#F59E0B'; // Amber
		return '#EF4444'; // Red
	}

	function getStatusText(score: number): string {
		if (score >= 75) return 'Healthy';
		if (score >= 50) return 'At Risk';
		return 'Critical';
	}
</script>

<Widget title="Team Health">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse">
			<div class="mb-4 flex justify-center">
				<div class="h-32 w-32 rounded-full bg-surface-200"></div>
			</div>
			<div class="space-y-2">
				<div class="h-6 rounded bg-surface-200"></div>
				<div class="h-6 rounded bg-surface-200"></div>
			</div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load team health</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="mb-4 flex justify-center">
			<!-- Health Score Gauge -->
			<div class="relative inline-flex items-center justify-center">
				<svg class="transform -rotate-90" width="120" height="120">
					<!-- Background arc -->
					<circle
						class="text-surface-200"
						stroke-width="10"
						stroke="currentColor"
						fill="transparent"
						r="50"
						cx="60"
						cy="60"
					/>
					<!-- Progress arc -->
					<circle
						stroke={getColorForScore($query.data.healthScore)}
						stroke-width="10"
						stroke-dasharray={314}
						stroke-dashoffset={314 - (314 * $query.data.healthScore) / 100}
						stroke-linecap="round"
						fill="transparent"
						r="50"
						cx="60"
						cy="60"
						style="transition: stroke-dashoffset 0.5s ease"
					/>
				</svg>
				<!-- Score text -->
				<div class="absolute text-center">
					<div class="text-2xl font-bold">{$query.data.healthScore}</div>
					<div class="text-xs text-surface-600">
						{getStatusText($query.data.healthScore)}
					</div>
				</div>
			</div>
		</div>

		<div class="space-y-2 text-center text-sm">
			<div class="flex justify-between rounded-lg bg-surface-50 p-2">
				<span class="text-surface-600">Avg Cycle Time</span>
				<span class="font-medium">{$query.data.cycleTime} days</span>
			</div>
			<div class="flex justify-between rounded-lg bg-surface-50 p-2">
				<span class="text-surface-600">Velocity</span>
				<span class="font-medium">{$query.data.velocity} pts/sprint</span>
			</div>
		</div>
	{/if}
</Widget>
