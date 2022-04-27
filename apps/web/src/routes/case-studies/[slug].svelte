<script lang="ts">
	// import { buildArticleJsonLd } from '$modules/shared/components/seo/build-json-ld';

	// import Seo from '$modules/shared/components/seo/seo.svelte';
	// import { serializeJsonLd } from '$modules/shared/components/seo/serialize-json-ld';
	import ArticlePortableText from '$modules/shared/components/portable-text/article-portable-text.svelte';
	import SimplePortableText from '$modules/shared/components/portable-text/simple-portable-text.svelte';
	import VideoPlayer from '$modules/shared/components/video-player/video-player.svelte';
	// import VideoPlayer from '$modules/shared/components/video-player/video-player.svelte';
	import type { Casestudy } from '$modules/shared/infra/models/casestudy';

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

<article class="max-w-5xl w-full mx-auto">
	<header>
		<h1 class="text-6xl font-bold">{casestudy.title}</h1>

		<div class="prose">
			<SimplePortableText blocks={casestudy.summary} />
		</div>

		<ul class="flex flex-row gap-4">
			{#each casestudy.tags as { title, slug, seo, id } (id)}
				<li class="bg-slate-300 p-[0.5em]">{title}</li>
			{/each}
		</ul>
	</header>

	{#if casestudy.projectDetails}
		<section id="project-details">
			<h2 class="text-sm font-bold">Details</h2>

			<div class="flex flex-row gap-4">
				{#each casestudy.projectDetails as { title, description } (title)}
					<div>
						<p class="font-bold">{title}</p>
						<div class="prose prose-sm">
							<SimplePortableText blocks={description} />
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section>
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
		{/if}

		<img src={casestudy.featuredImage.url} alt={casestudy.featuredImage.alt} />
	</section>

	<section class="prose">
		<ArticlePortableText blocks={casestudy.body} />
	</section>
</article>
