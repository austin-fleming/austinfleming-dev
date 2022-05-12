<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Icon from '$modules/common/components/icons/icon.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
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

<main class="w-full overflow-x-hidden pb-header bg-primary">
	<article class="relative w-full [--hero-height:min(30rem,50vh)] pt-[var(--hero-height)]">
		<header
			class="fixed top-0 right-0 left-0 h-[var(--hero-height)] min-h-[var(--hero-height)] flex flex-col justify-between text-background"
		>
			{#key casestudy.featuredImage.url}
				<Image
					preload
					class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full opacity-50 -z-10"
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
			{/key}
			<nav
				class="width-wide p-contentPadding flex flex-row items-center leading-none font-bold text-sm gap-[0.5em]"
			>
				{#each casestudy.breadcrumbs as { to, label } (to)}
					<Link class="transition duration-200 hover:underline" {to}>{label}</Link>
					<Icon name="caretRight" />
				{/each}
			</nav>

			<h1 class="text-4xl sm:text-6xl width-wide px-contentPadding ">
				{casestudy.title}
			</h1>

			<ul
				class="width-wide p-contentPadding flex flex-row flex-wrap justify-start items-center text-xs gap-[0.5em] "
			>
				{#each casestudy.tags as { title } (title)}
					<li
						class="py-[0.3em] px-[1.25em] bg-background font-bold text-primary/80 rounded-[0.5em]"
					>
						{title}
					</li>
				{/each}
			</ul>
		</header>

		<div class="relative border-solid border-t-section border-primary bg-background">
			{#if casestudy.projectDetails}
				<section
					id="article-details"
					class="width-wide p-contentPadding grid grid-cols-1 sm:grid-cols-[3fr,_2fr] md:grid-cols-2 gap-8 md:gap-24 items-baseline"
				>
					<div id="article-summary" class="font-bold prose prose-md sm:prose-lg md:prose-xl">
						<SimplePortableText blocks={casestudy.summary} />
					</div>

					<div class="grid items-baseline w-full grid-cols-2 gap-4 sm:grid-cols-2">
						{#each casestudy.projectDetails as { title, description } (title)}
							<div class="flex-shrink flex-grow basis-[150px]">
								<p class="text-sm font-bold">{title}</p>
								<div class="prose-sm prose opacity-80">
									<SimplePortableText blocks={description} />
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}

			<section class="flex flex-col width-wide p-contentPadding gap-contentPadding">
				{#each casestudy.articleBody as body (body._key)}
					{#if body._type === 'article_text_section'}
						<div class="grid items-baseline grid-cols-1 md:grid-cols-2 py-contentPadding">
							<h2 class="text-3xl md-4xl mb-[0.75em] md:mb-0">{body.title}</h2>
							<div class="prose">
								<ArticlePortableText blocks={body.body} />
							</div>
						</div>
					{/if}

					{#if body._type === 'image_asset'}
						<Image
							class="w-full"
							alt={body.alt}
							width={body.width}
							height={body.height}
							source={body.url}
							sizes={{ xl: '1500px' }}
							config={{
								lqip: body.base64Lqip,
								provider: 'SANITY'
							}}
						/>
					{/if}

					{#if body._type === 'video_asset'}
						<VideoPlayer
							videoData={{
								title: body.title,
								mp4Source: body.formats.mp4.high.source,
								posterUrl: body.thumbnailUrl,
								aspectRatio: body.aspectRatio.ratio,
								attribution: body.attribution,
								caption: body.caption
							}}
						/>
					{/if}
				{/each}
			</section>
		</div>
	</article>

	{#if casestudy.next}
		<section
			class="relative w-full h-[min(50vh,40rem)] border-t-section border-solid border-primary bg-primary flex flex-col z-10"
		>
			{#key casestudy.next.featuredImage.url}
				<Image
					class="absolute w-full h-full overflow-hidden top-0 right-0 bottom-0 left-0 object-cover object-center opacity-40 -z-[1]"
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
			{/key}

			<div class="flex flex-col width-wide p-contentPadding text-background">
				<p class="text-xl flex flex-row gap-[0.5em] leading-none items-center">
					Next Project <Icon class="text-[1.25em]" name="arrowRight" />
				</p>
				<p class="text-4xl mt-[0.5em]">{casestudy.next.title}</p>
			</div>

			<Link prefetch class="absolute top-0 bottom-0 left-0 right-0" to={casestudy.next.path}>
				<span class="sr-only">Next Project</span>
			</Link>
		</section>
	{/if}
</main>

<style>
	.width-wide {
		@apply w-full max-w-container mx-auto;
	}

	.width-narrow {
		@apply w-full max-w-container-narrow mx-auto;
	}
</style>
