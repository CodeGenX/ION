<script lang="ts">
	let { status, children }: { status: 'red' | 'amber' | 'green'; children?: any } = $props();

	const colorClasses = {
		red: 'bg-error-100 text-error-800',
		amber: 'bg-warning-100 text-warning-800',
		green: 'bg-success-100 text-success-800'
	};
</script>

<span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium {colorClasses[status]}">
	{#if children}
		{@render children()}
	{:else}
		{status.charAt(0).toUpperCase() + status.slice(1)}
	{/if}
</span>
