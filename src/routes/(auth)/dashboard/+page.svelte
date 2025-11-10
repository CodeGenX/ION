<script lang="ts">
	import PortfolioHealthWidget from '$lib/components/widgets/PortfolioHealthWidget.svelte';
	import ValueDeliveryWidget from '$lib/components/widgets/ValueDeliveryWidget.svelte';
	import ActiveInitiativesWidget from '$lib/components/widgets/ActiveInitiativesWidget.svelte';
	import TeamHealthWidget from '$lib/components/widgets/TeamHealthWidget.svelte';
	import RiskIndicatorsWidget from '$lib/components/widgets/RiskIndicatorsWidget.svelte';
	import RecentUpdatesWidget from '$lib/components/widgets/RecentUpdatesWidget.svelte';

	let { data } = $props();
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-surface-900">Executive Dashboard</h1>
		<p class="mt-2 text-sm text-surface-600">
			Welcome to your Product Portfolio Management dashboard
		</p>
	</div>

	<!-- Dashboard Widgets -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<PortfolioHealthWidget />
		<ValueDeliveryWidget />
		<ActiveInitiativesWidget />
		<TeamHealthWidget />
		<RiskIndicatorsWidget />
		<RecentUpdatesWidget />
	</div>
</div>
