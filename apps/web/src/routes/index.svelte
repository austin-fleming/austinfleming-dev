<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import Icon from '$modules/common/components/icons/icon.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import CasestudyPreview from '$modules/portfolio/components/casestudies/casestudy-preview.svelte';
	import HomeAbout from '$modules/portfolio/components/home/home-about.svelte';
	import HomeArchive from '$modules/portfolio/components/home/home-archive.svelte';
	import HomeCasestudiesIntro from '$modules/portfolio/components/home/home-casestudies-intro.svelte';
	import HomeContact from '$modules/portfolio/components/home/home-contact.svelte';
	import HomeFooter from '$modules/portfolio/components/home/home-footer.svelte';
	import HomeHero from '$modules/portfolio/components/home/home-hero.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import type { HomePage } from '$modules/portfolio/infra/models/home-page';
	import { onMount, SvelteComponent } from 'svelte';

	export let homePage: HomePage;

	let workTop: number;
	let mainElement: HTMLElement;
	let workSection: SvelteComponent;
	let hash: string;

	$: hash = $page.url.hash;

	onMount(() => {
		workTop = workSection.offsetTop;
		if (hash === '#hash') mainElement.scrollTop = workTop;
	});

	$: {
		hash = $page.url.hash;
		if (mainElement && hash === '#work') mainElement.scrollTop = workTop;
	}
</script>

<main
	class="absolute top-0 w-full overflow-x-hidden heightScreenFix minHeightScreenFix overflow-y-scroll flex flex-col justify-start scroll-smooth overscroll-none"
	bind:this={mainElement}
>
	<HomeHero id="hero" class="sticky top-0 w-full pb-header" />

	<HomeAbout id="about" class="relative w-full border-t-section border-solid border-primary" />

	<HomeCasestudiesIntro
		id="work"
		class="sticky top-0 border-t-section border-solid border-primary"
		bind:offsetHeight={workTop}
		bind:this={workSection}
	/>

	{#each homePage.casestudies as casestudy, index (casestudy.id)}
		<CasestudyPreview
			class="sticky top-header min-h-screen h-screen pb-header w-full border-t-section border-solid border-primary article-shadow md:pb-headerDouble"
			id={`casestudy${index}`}
			{casestudy}
			orderNumber={index + 1}
		/>
	{/each}

	<HomeArchive id="archive" class="relative w-full border-t-section border-solid border-primary" />

	<HomeContact id="contact" class="sticky top-0 border-t-section border-solid border-primary" />

	<HomeFooter
		id="footer"
		class="relative w-full pb-header border-t-section border-solid border-primary"
	/>
</main>
