<script lang="ts">
	import Icon from '$modules/common/components/icons/icon.svelte';
	import type { Snippet } from '$modules/portfolio/infra/models/snippets-page';
	import PortfolioImage from '$modules/portfolio/components/image/image.svelte';
	// import type SnippetModal from './snippet-modal.svelte';
	import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
	import { aspectRatio } from '$utils/aspect-ratio';
	import type { SvelteComponent } from 'svelte';
	import type { SvelteComponentDev } from 'svelte/internal';
	import SnippetVideo from './snippet-video.svelte';
	import Image from '$modules/common/components/image/image.svelte';

	let _class = '';
	export { _class as class };

	export let snippet: Snippet;

	let modalOpened = false;

	let modal: Promise<SvelteComponentDev>;

	const loadModal = () => {
		modal = import('./snippet-modal.svelte');
	};
</script>

<article class={`root ${_class}`}>
	<figure class="figure">
		{#if snippet._type === 'image_asset'}
			<Image
				lqip={snippet.base64Lqip}
				alt={snippet.alt}
				width={snippet.width}
				height={snippet.width * 1.25}
				source={snippet.url}
				sizes={{ xl: `${1500 / 4}px`, md: '2vw' }}
			/>
		{/if}

		{#if snippet._type === 'video_asset'}
			<img
				loading="lazy"
				class="image"
				src={snippet.gifUrl || snippet.thumbnailUrl}
				alt={snippet.title}
			/>
			<span
				class="absolute w-full h-full flex flex-col justify-center items-center text-background opacity-50 text-8xl"
			>
				<Icon name="play" />
			</span>
		{/if}
	</figure>

	<button
		class="open-action"
		type="button"
		on:click={() => {
			modalOpened = true;
			loadModal();
		}}
	>
		<span class="sr-only">Open Modal</span>
	</button>

	{#if modalOpened && modal}
		{#await modal then { default: SnippetModal }}
			<SnippetModal>
				<button
					class="absolute top-4 right-4"
					type="button"
					on:click={() => {
						modalOpened = false;
					}}>Close</button
				>
				<div class="w-full max-h-full">
					{#if snippet._type === 'image_asset'}
						<Image
							lqip={snippet.base64Lqip}
							alt={snippet.alt}
							width={snippet.width}
							height={snippet.height}
							source={snippet.url}
							class="max-h-full max-w-full mx-auto"
						/>
					{/if}

					{#if snippet._type === 'video_asset'}
						<SnippetVideo
							videoData={{
								posterUrl: snippet.thumbnailUrl,
								hlsSource: snippet.hlsPlaybackUrl,
								title: snippet.title,
								caption: snippet.caption,
								attribution: snippet.attribution,
								aspectRatio: snippet.aspectRatio
							}}
							playerOptions={{ loop: true, muted: true }}
						/>
					{/if}
				</div>
			</SnippetModal>
		{/await}
	{/if}
	<section />
</article>

<style>
	.root {
		@apply relative;
	}

	.figure {
		@apply relative w-full rounded-2xl overflow-hidden bg-accent1;
	}

	.image {
		@apply absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover object-center;
	}

	.open-action {
		@apply bg-transparent border-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full;
	}
</style>
