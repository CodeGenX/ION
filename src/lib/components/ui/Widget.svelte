<script lang="ts">
	let { title, children }: { title: string; children: any } = $props();
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h3 class="mb-4 text-lg font-medium text-surface-900">{title}</h3>
	<div>
		{@render children()}
	</div>
</div>
