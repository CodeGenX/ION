<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { trpc } from '$lib/trpc/client';
	import Widget from '$lib/components/ui/Widget.svelte';

	const query = createQuery({
		queryKey: ['dashboard', 'recentActivity'],
		queryFn: () => trpc.dashboard.getRecentActivity.query()
	});

	function formatRelativeTime(date: Date | string): string {
		const now = new Date();
		const activityDate = new Date(date);
		const diffMs = now.getTime() - activityDate.getTime();
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
		if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
		if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
		return activityDate.toLocaleDateString();
	}

	function getActivityIcon(activityType: string): string {
		switch (activityType) {
			case 'initiative_created':
				return '🚀';
			case 'initiative_updated':
				return '✏️';
			case 'risk_identified':
				return '⚠️';
			case 'value_delivered':
				return '💰';
			case 'status_changed':
				return '🔄';
			default:
				return '📌';
		}
	}
</script>

<Widget title="Recent Updates">
	{#if $query.isLoading}
		<!-- Skeleton loading state -->
		<div class="animate-pulse space-y-3">
			<div class="h-14 rounded bg-surface-200"></div>
			<div class="h-14 rounded bg-surface-200"></div>
			<div class="h-14 rounded bg-surface-200"></div>
			<div class="h-14 rounded bg-surface-200"></div>
			<div class="h-14 rounded bg-surface-200"></div>
		</div>
	{:else if $query.isError}
		<!-- Error state -->
		<div class="text-error-500">
			<p class="mb-2">Failed to load recent activity</p>
			<button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
		</div>
	{:else if $query.data}
		<!-- Success state -->
		<div class="max-h-96 space-y-2 overflow-y-auto">
			{#each $query.data as activity, index}
				<div
					class="rounded-lg p-3 transition-colors hover:bg-surface-50 {index % 2 === 0
						? 'bg-white'
						: 'bg-surface-50'}"
				>
					<div class="flex items-start gap-3">
						<div class="text-xl">{getActivityIcon(activity.activityType)}</div>
						<div class="flex-1">
							<div class="text-sm font-medium">{activity.title}</div>
							{#if activity.description}
								<div class="mt-1 text-xs text-surface-600">{activity.description}</div>
							{/if}
							<div class="mt-1 text-xs text-surface-500">
								{formatRelativeTime(activity.createdAt)}
							</div>
						</div>
					</div>
				</div>
			{/each}

			{#if $query.data.length === 0}
				<div class="py-8 text-center text-sm text-surface-600">No recent activity</div>
			{/if}
		</div>
	{/if}
</Widget>
