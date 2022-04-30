<script lang="ts">
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
	import CasestudyPreviewCard from './casestudy-preview-card.svelte';

	export let casestudies: Casestudy[];
</script>

<section class="grid grid-cols-3 gap-4">
	{#each casestudies as casestudy (casestudy.id)}
		<CasestudyPreviewCard {casestudy} />
	{/each}
</section>
