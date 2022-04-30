<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	// import { buildArticleJsonLd } from '$modules/portfolio/components/seo/build-json-ld';

	// import Seo from '$modules/portfolio/components/seo/seo.svelte';
	// import { serializeJsonLd } from '$modules/portfolio/components/seo/serialize-json-ld';
	import Chip from '$modules/common/components/chip/chip.svelte';
	import ArticlePortableText from '$modules/portfolio/components/portable-text/article-portable-text.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
	// import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';

	export let casestudy: Casestudy;
</script>

<svelte:head>
	<title>{casestudy.seo.title}</title>
	<link rel="canonical" href={casestudy.seo.canonicalUrl} />
	<meta name="description" content={casestudy.seo.description} />
	<meta name="keywords" content={casestudy.seo.keywords.join(', ')} />
	<script></script>

	<!-- {@html serializeJsonLd(
		buildArticleJsonLd({
			headline: casestudy.seo.title,
			keywords: casestudy.seo.keywords,
			timestampPublished: casestudy.timestampPublished,
			timestampModified: casestudy.timestampModified,
			canonicalUrl: casestudy.seo.canonicalUrl,
			images: [casestudy.seo.image.url],
			description: casestudy.seo.description
		})
	)} -->
</svelte:head>

<article class="w-full mx-auto px-48">
	<header class="w-full max-w-[1400px] mx-auto flex flex-col gap-48 justify-between">
		<div class="mt-48 flex flex-col gap-6">
			<h1 class="text-8xl font-bold mb-12 w-full max-w-[80%]">{casestudy.title}</h1>

			<ul class="flex flex-row gap-4">
				{#each casestudy.tags as { title, slug, seo, id } (id)}
					<li>
						<Chip size="sm">{title}</Chip>
					</li>
				{/each}
			</ul>

			<div class="prose">
				<SimplePortableText blocks={casestudy.summary} />
			</div>
		</div>

		<div>
			{#if casestudy.featuredVideo}
				<VideoPlayer
					videoData={{
						title: casestudy.featuredVideo.title,
						hlsSource: casestudy.featuredVideo.hlsPlaybackUrl,
						posterUrl: casestudy.featuredVideo.thumbnailUrl,
						aspectRatio: casestudy.featuredVideo.aspectRatio,
						attribution: casestudy.featuredVideo.attribution,
						caption: casestudy.featuredVideo.caption
					}}
				/>
			{:else}
				<img src={casestudy.featuredImage.url} alt={casestudy.featuredImage.alt} />
			{/if}
		</div>
	</header>

	{#if casestudy.projectDetails}
		<section id="project-details" class="w-full max-w-6xl mx-auto">
			{#each casestudy.projectDetails as { title, description } (title)}
				<div>
					<p class="font-bold">{title}</p>
					<div class="prose prose-sm">
						<SimplePortableText blocks={description} />
					</div>
				</div>
			{/each}
		</section>
	{/if}

	<section class="w-full max-w-container-narrow prose prose-lg mx-auto">
		<ArticlePortableText blocks={casestudy.body} />
	</section>
</article>
