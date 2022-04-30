<script lang="ts">
	import CasestudyPreviewSlider from '$modules/portfolio/components/casestudies/casestudy-preview-slider.svelte';
	import type { HomePage } from '$modules/portfolio/infra/models/home-page';

	export let homePage: HomePage;
</script>

<section class="w-full h-screen p-4">
	<div class="hero-root w-full h-full rounded-xl" />
</section>

<section>
	<CasestudyPreviewSlider casestudies={homePage.casestudies} />
</section>

<style>
	.hero-root {
		background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
	}
</style>
