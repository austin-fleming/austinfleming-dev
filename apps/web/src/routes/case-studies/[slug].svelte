<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import BreadCrumbs from '$modules/common/components/bread-crumbs/bread-crumbs.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import CaseStudyHeroVideo from '$modules/portfolio/components/casestudies/case-study-hero-video.svelte';
	import ArticlePortableText from '$modules/portfolio/components/portable-text/article-portable-text.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
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

<div
	class="w-full min-h-screen [--article-bottom:6rem] pb-[var(--article-bottom)] pt-[15vh] [--border-radii:1rem]"
>
	<article
		class="bg-background shadow-lg rounded-[var(--border-radii)] overflow-hidden p-4 sm:px-8 flex flex-col gap-16 py-8"
	>
		<header id="article-header" class="content-wide flex flex-col gap-8">
			<div>
				<BreadCrumbs class="md:text-lg" crumbs={casestudy.breadcrumbs} />

				<ul class="flex flex-row flex-wrap gap-2 mt-2 text-xs text-primary-lesser font-bold">
					{#each casestudy.tags as { title, slug, seo, id } (id)}
						<li>
							<!-- <Chip size="xs" class="opacity-50">{title}</Chip> -->
							<span>{title.toLowerCase()}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="py-16 max-w-[90%] sm:max-w-[80%]">
				<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">{casestudy.title}</h1>
				<p class="text-primary-lesser font-bold mt-[1.25em] text-base sm:text-lg lg:text-2xl">
					{casestudy.shortSummary}
				</p>
			</div>
		</header>

		<figure id="article-main-media" class="content-wide">
			{#if casestudy.featuredVideo}
				<!-- <CaseStudyHeroVideo videoAsset={casestudy.featuredVideo} /> -->
				<VideoPlayer
					videoData={{
						title: casestudy.featuredVideo.title,
						mp4Source: casestudy.featuredVideo.formats.mp4.high.source,
						posterUrl: casestudy.featuredVideo.thumbnailUrl,
						aspectRatio: casestudy.featuredVideo.aspectRatio.ratio,
						attribution: casestudy.featuredVideo.attribution,
						caption: casestudy.featuredVideo.caption
					}}
				/>
			{:else}
				<Image
					class="w-full"
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
			{/if}
		</figure>

		{#if casestudy.projectDetails}
			<section
				id="article-details"
				class="content-wide grid grid-cols-1 sm:grid-cols-[3fr,_2fr] md:grid-cols-2 gap-8 md:gap-24 items-baseline"
			>
				<div id="article-summary" class="prose prose-md sm:prose-lg md:prose-xl font-bold">
					<SimplePortableText blocks={casestudy.summary} />
				</div>

				<div class="w-full grid grid-cols-2 sm:grid-cols-2 gap-4 items-baseline">
					{#each casestudy.projectDetails as { title, description } (title)}
						<div class="flex-shrink flex-grow basis-[150px]">
							<p class="font-bold text-sm">{title}</p>
							<div class="prose prose-sm opacity-80">
								<SimplePortableText blocks={description} />
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section
			id="article-body"
			class="content-narrow prose prose-sm sm:prose-base md:prose-lg xl:prose-xl prose-p:text-primary-less prose-video:m-0 prose-video:p-0 prose-img:rounded-2xl"
		>
			<!-- If featured video exists, move featured image to start of body -->
			{#if casestudy.featuredVideo}
				<Image
					class="w-full"
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
			{/if}

			<ArticlePortableText blocks={casestudy.body} />
		</section>
	</article>

	{#if casestudy.next}
		<aside
			class="group relative w-full [--next-article-height:min(30vw,40vh)] h-[var(--next-article-height)]"
		>
			<div
				class="h-[calc(var(--next-article-height)_+_1.5rem)] fixed left-0 sm:left-4 bottom-[var(--article-bottom)] right-0 sm:right-4 -z-10 shadow-md rounded-b-[var(--border-radii)] overflow-hidden bg-primary group-hover:bg-accent1 transition-colors duration-200"
			>
				<Image
					class="w-full min-w-full h-full object-cover object-center opacity-40"
					alt={casestudy.next.featuredImage.alt}
					width={casestudy.next.featuredImage.width}
					height={casestudy.next.featuredImage.height}
					source={casestudy.next.featuredImage.url}
					sizes={{ xl: '1500px' }}
					quality={40}
					config={{
						lqip: casestudy.next.featuredImage.base64Lqip,
						provider: 'SANITY'
					}}
				/>

				<p
					class="absolute w-full h-full top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-[5vw] font-bold text-background"
				>
					Next Project
				</p>
			</div>

			<Link to={casestudy.next.path} class="absolute w-full h-full top-0 right-0 bottom-0 left-0"
				><span class="sr-only">Next Project</span></Link
			>
		</aside>
	{/if}
</div>

<style>
	.content-wide {
		@apply w-full max-w-screen-xl mx-auto;
	}

	.content-narrow {
		@apply w-full max-w-screen-md mx-auto;
	}
</style>
