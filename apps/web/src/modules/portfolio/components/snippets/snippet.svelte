<script lang="ts">
	import Icon from '$modules/common/components/icons/icon.svelte';
	import type { Snippet } from '$modules/portfolio/infra/models/snippets-page';
	// import PortfolioImage from '$modules/portfolio/components/image/image.svelte';
	// import type SnippetModal from './snippet-modal.svelte';
	import VideoPlayer from '$modules/portfolio/components/video-player/video-player.svelte';
	// import { aspectRatio } from '$utils/aspect-ratio';
	// import type { SvelteComponent } from 'svelte';
	import { getContext, type SvelteComponentDev } from 'svelte/internal';
	import SnippetVideo from './snippet-video.svelte';
	import Image from '$modules/common/components/image/image.svelte';
	import Chip from '$modules/common/components/chip/chip.svelte';

	let _class = '';
	export { _class as class };

	export let snippet: Snippet;

	let modalOpened = false;

	let modal: Promise<SvelteComponentDev>;

	const loadModal = () => {
		modal = import('./snippet-modal.svelte');
	};

	// NOTE: optimization to ensure the first snippet can be eager loaded.
	const isFirstSnippet = getContext<string | undefined>('first-snippet-id') === snippet.id;
</script>

<article class={`root ${_class}`}>
	<figure class="figure relative">
		{#if snippet._type === 'image_asset'}
			<Image
				alt={snippet.alt}
				width={snippet.width}
				height={snippet.width * 1.25}
				source={snippet.url}
				sizes={{ lg: `${1500 / 4}px`, md: '50vw' }}
				preload={isFirstSnippet}
				config={{
					provider: 'SANITY',
					lqip: snippet.base64Lqip
				}}
			/>
		{/if}

		{#if snippet._type === 'video_asset'}
			<Image
				alt={snippet.title}
				width={snippet.formats.mp4.medium.width}
				height={snippet.formats.mp4.medium.width * 1.25}
				source={snippet.thumbnailUrl}
				sizes={{ lg: `${1500 / 4}px`, md: '50vw' }}
				preload={isFirstSnippet}
				config={{
					provider: 'MUX'
				}}
			/>
			<span
				class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-background opacity-90 text-5xl"
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
					class="absolute top-4 right-4 z-modal"
					type="button"
					on:click={() => {
						modalOpened = false;
					}}><Chip>close</Chip></button
				>
				<div class="w-full h-full flex flex-col justify-center items-center gap-4">
					{#if snippet._type === 'image_asset'}
						<div class="w-full max-w-full h-auto max-h-full">
							<Image
								class="max-w-full max-h-full drop-shadow-md mx-auto"
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
						</div>
					{/if}

					{#if snippet._type === 'video_asset'}
						<VideoPlayer
							class="drop-shadow-md"
							videoData={{
								title: snippet.title,
								mp4Source: snippet.formats.mp4.high.source,
								posterUrl: snippet.thumbnailUrl,
								aspectRatio: snippet.aspectRatio.ratio,
								attribution: snippet.attribution,
								caption: snippet.caption
							}}
						/>
						<!-- <SnippetVideo
							videoData={{
								posterUrl: snippet.thumbnailUrl,
								hlsSource: snippet.hlsPlaybackUrl,
								title: snippet.title,
								caption: snippet.caption,
								attribution: snippet.attribution,
								aspectRatio: snippet.aspectRatio
							}}
							playerOptions={{ loop: true, muted: true }}
						/> -->
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
		@apply relative w-full rounded-2xl overflow-hidden;
	}

	.image {
		@apply absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover object-center;
	}

	.open-action {
		@apply bg-transparent border-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full;
	}
</style>
