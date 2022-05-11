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

<!-- TODO: use SEO component -->
<svelte:head>
	<title>Austin Fleming</title>
	<meta name="description" content="Web developer in San Diego, California" />
</svelte:head>

<main
	class="absolute top-0 flex flex-col justify-start w-full overflow-x-hidden overflow-y-scroll heightScreenFix minHeightScreenFix scroll-smooth overscroll-none"
	bind:this={mainElement}
>
	<HomeHero id="hero" class="sticky top-0 w-full pb-header" />

	<HomeAbout id="about" class="relative w-full border-solid border-t-section border-primary" />

	<HomeCasestudiesIntro
		id="work"
		class="sticky top-0 border-solid border-t-section border-primary"
		bind:offsetHeight={workTop}
		bind:this={workSection}
	/>

	{#each homePage.casestudies as casestudy, index (casestudy.id)}
		<CasestudyPreview
			class="sticky w-full h-screen min-h-screen border-solid top-header pb-header border-t-section border-primary article-shadow md:pb-headerDouble"
			id={`casestudy${index}`}
			{casestudy}
			orderNumber={index + 1}
		/>
	{/each}

	<HomeArchive id="archive" class="relative w-full border-solid border-t-section border-primary" />

	<HomeContact id="contact" class="sticky top-0 border-solid border-t-section border-primary" />

	<HomeFooter
		id="footer"
		class="relative w-full border-solid pb-header border-t-section border-primary"
	/>
</main>
