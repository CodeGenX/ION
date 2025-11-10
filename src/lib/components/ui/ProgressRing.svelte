<script lang="ts">
	let {
		percentage,
		size = 120,
		strokeWidth = 10
	}: {
		percentage: number;
		size?: number;
		strokeWidth?: number;
	} = $props();

	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (percentage / 100) * circumference;

	// Color based on percentage
	const color = percentage >= 75 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444';
</script>

<div class="relative inline-flex items-center justify-center">
	<svg class="transform -rotate-90" width={size} height={size}>
		<!-- Background circle -->
		<circle
			class="text-surface-200"
			stroke-width={strokeWidth}
			stroke="currentColor"
			fill="transparent"
			r={radius}
			cx={size / 2}
			cy={size / 2}
		/>
		<!-- Progress circle -->
		<circle
			stroke={color}
			stroke-width={strokeWidth}
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			stroke-linecap="round"
			fill="transparent"
			r={radius}
			cx={size / 2}
			cy={size / 2}
			style="transition: stroke-dashoffset 0.5s ease"
		/>
	</svg>
	<!-- Percentage text -->
	<span class="absolute text-xl font-bold text-surface-900">
		{Math.round(percentage)}%
	</span>
</div>
