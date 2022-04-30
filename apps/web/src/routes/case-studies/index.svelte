<script lang="ts">
	import CasestudyPreviewSlider from '$modules/portfolio/components/casestudies/casestudy-preview-slider.svelte';
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';

	export let casestudies: Casestudy[];
</script>

<section>
	<CasestudyPreviewSlider {casestudies} />
</section>
