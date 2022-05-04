<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import BreadCrumbs from '$modules/common/components/bread-crumbs/bread-crumbs.svelte';
	import Link from '$modules/common/components/link.svelte';
	import CasestudyCard from '$modules/portfolio/components/casestudies/casestudy-card.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import type { CasestudiesPage } from '$modules/portfolio/infra/models/casestudies-page';

	export let casestudiesPage: CasestudiesPage;
</script>

<!-- <div class="relative pb-64">
	<div
		class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sitepad px-sitepad bg-background shadow-lg pb-sitepad md:pt-24 rounded-bl-3xl rounded-br-3xl z-10"
	>
		<header class="w-full h-full py-24 md:py-0 flex flex-col prose">
			<h1 class="w-full max-w-[80%] text-4xl md:text-6xl font-bold">Recent Work</h1>

			<div class="w-full max-w-[75%]">
				<p class="font-bold">Breakdowns of recent projects.</p>

				<p>
					You can find a mish mash of older and smaller projects in the <Link
						class="underline text-primary-less hover:text-primary-lesser transition-colors"
						prefetch
						to="/snippets">archive</Link
					>.
				</p>
			</div>
		</header>
		{#each casestudies as casestudy, index (casestudy.id)}
			<CasestudyCard {casestudy} preload={index === 0} />
		{/each}
	</div>

	<section class="fixed bottom-sitebottom w-full flex flex-col items-center gap-4 -z-0">
		<p>There's more</p>
		<a
			class="block mx-auto leading-none py-[0.6em] px-[2em] bg-primary text-lg text-center font-bold text-background rounded-full"
			href="/snippets">View the Archive</a
		>
	</section>
</div> -->
<div class="relative pb-sitebottom pt-24">
	<div class="bg-background shadow-lg rounded-b-3xl pb-sitepad px-4 sm:px-8 rounded-2xl">
		<div
			class="relative max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-sitepad pt-8 sm:pt-12 z-10"
		>
			<header id="article-header" class="flex flex-col gap-8 px-4">
				<div>
					<BreadCrumbs class="text-xs md:text-base" crumbs={casestudiesPage.breadcrumbs} />
				</div>

				<div class="py-8 max-w-[90%] sm:max-w-[80%]">
					<h1 class="text-5xl md:text-7xl font-bold">
						{casestudiesPage.title}
					</h1>

					{#if casestudiesPage.subtitle}
						<p class="text-primary-lesser font-bold mt-[1.25em] text-base sm:text-lg lg:text-2xl">
							{casestudiesPage.subtitle}
						</p>
					{/if}
				</div>

				{#if casestudiesPage.description}
					<div class="prose prose-sm sm:prose-base max-w-[25ch]">
						<SimplePortableText blocks={casestudiesPage.description} />
					</div>
				{/if}
			</header>

			<!-- <header class="w-full h-full py-24 md:py-0 flex flex-col">
				<BreadCrumbs
					crumbs={[
						{
							to: '/',
							label: 'home'
						}
					]}
				/>
				<h1 class="w-full max-w-[80%] text-4xl md:text-6xl font-bold py-[1.5em]">
					{casestudiesPage.title}
				</h1>

				<div class="w-full max-w-[75%] prose leading-snug">
					{#if casestudiesPage.subtitle}
						<p class="font-bold">{casestudiesPage.subtitle}</p>
					{/if}

					{#if casestudiesPage.description}
						<div>
							<SimplePortableText blocks={casestudiesPage.description} />
						</div>
					{/if}
				</div>
			</header> -->
			{#each casestudiesPage.casestudies as casestudy, index (casestudy.id)}
				<CasestudyCard {casestudy} preload={index === 0} />
			{/each}

			<aside class="w-full flex flex-col items-center gap-4 py-16">
				<p>There's more</p>
				<a
					class="block mx-auto leading-none py-[0.6em] px-[2em] bg-primary text-lg text-center font-bold text-background rounded-full"
					href="/snippets">View the Archive</a
				>
			</aside>
		</div>
	</div>
</div>
