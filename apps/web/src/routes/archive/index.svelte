<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import Snippet from '$modules/portfolio/components/archive/snippet.svelte';
	import SimplePortableText from '$modules/portfolio/components/portable-text/simple-portable-text.svelte';
	import type { SnippetsPage } from '$modules/portfolio/infra/models/snippets-page';

	export let snippetsPage: SnippetsPage;
</script>

<!-- <main class="w-full bg-background pb-header">
	<Container class="grid grid-cols-2 gap-2 article-container md:grid-cols-4">
		{#each snippetsPage.snippets as snippet, index (snippet.id)}
			<article class="archive-item relative w-full pb-[125%] overflow-hidden group">
				{#if snippet._type === 'image_asset'}
					<Image
						class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full"
						alt={snippet.alt}
						width={snippet.width}
						height={snippet.height}
						source={snippet.url}
						sizes={{ '2xl': `${1500}px` }}
						config={{
							provider: 'SANITY',
							lqip: snippet.base64Lqip
						}}
					/>
				{/if}

				{#if snippet._type === 'video_asset'}
					<Image
						class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full"
						alt={snippet.title}
						width={snippet.formats.hls.maxWidth}
						height={snippet.formats.hls.maxHeight}
						source={snippet.thumbnailUrl}
						sizes={{ '2xl': `${1500}px` }}
						config={{
							provider: 'MUX'
						}}
					/>
				{/if}

				<div
					class="absolute top-0 left-0 flex flex-col-reverse justify-between w-full h-full gap-4 p-4 transition-all duration-500 opacity-0 archive-item__overlay bg-accent1/75 text-background"
				>
					<div>
						<h1 class="text-2xl">Title</h1>

						<div class="prose-sm prose text-background">
							<SimplePortableText blocks={snippet.caption} />
						</div>
					</div>

					<div class="flex flex-row gap-2 text-xs font-bold">
						<span class="leading-none text-background">Javascript</span>
						<span class="leading-none text-background">Branding</span>
					</div>
				</div>

				<Link class="absolute top-0 left-0 w-full h-full" to="#">
					<span class="sr-only">Open Snippet</span>
				</Link>
			</article>
		{/each}
	</Container>
</main> -->

<main class="w-full bg-background pb-header">
	<Container>
		<h1 class="text-6xl pt-[1em]">Snippets</h1>
		<p class="pt-[1em]">Some old, some small, and some just for fun.</p>
	</Container>

	<Container class="grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each snippetsPage.snippets as snippet, index (snippet.id)}
			<Snippet {snippet} />
		{/each}
	</Container>
</main>
