<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import BreadCrumbs from '$modules/common/components/bread-crumbs/bread-crumbs.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import ArticlePortableText from '$modules/portfolio/components/portable-text/article-portable-text.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';

	export let casestudy: Casestudy;
</script>

<article class="relative bg-background shadow-lg rounded-[var(--border-radii)] overflow-hidden">
	<figure id="article-main-media" class="w-full h-screen bg-primary overflow-hidden">
		<Image
			class="w-full h-full opacity-40 object-cover object-center"
			alt={casestudy.featuredImage.alt}
			width={casestudy.featuredImage.width}
			height={casestudy.featuredImage.height}
			source={casestudy.featuredImage.url}
			sizes={{ xl: '1500px' }}
			config={{
				lqip: casestudy.featuredImage.base64Lqip,
				provider: 'SANITY'
			}}
		/>
	</figure>
	<header
		id="article-header"
		class="absolute left-0 top-0 right-0 h-screen content-wide flex flex-col justify-center gap-8 text-background"
	>
		<div class="border-b-[0.5px] border-solid border-background border- pb-[10vh]">
			<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">{casestudy.title}</h1>
			<!-- <ul class="flex flex-row flex-wrap gap-2 mt-2 text-xs text-primary-lesser font-bold">
				{#each casestudy.tags as { title, slug, seo, id } (id)}
					<li>
						<span>{title.toLowerCase()}</span>
					</li>
				{/each}
			</ul> -->
		</div>

		<!-- <div class="py-16 max-w-[90%] sm:max-w-[80%]">
			<p class="text-primary-lesser font-bold mt-[1.25em] text-base sm:text-lg lg:text-2xl">
				{casestudy.shortSummary}
			</p>
		</div> -->
	</header>
</article>

<style>
	.content-wide {
		@apply w-full max-w-screen-xl mx-auto;
	}

	.content-narrow {
		@apply w-full max-w-screen-md mx-auto;
	}
</style>
