<script lang="ts">
	import type { Snippet } from '$modules/portfolio/infra/models/snippets-page';
	import Image from '$modules/common/components/image/image.svelte';
	import Link from '$modules/common/components/link.svelte';
	import SimplePortableText from '../portable-text/simple-portable-text.svelte';
	import SnippetModal from './snippet-modal.svelte';

	export let snippet: Snippet;

	let openModal = false;
</script>

<article class="group relative border-section border-solid border-background">
	<!-- TODO: needs loading icon -->
	<figure class="relative w-full pb-[125%] overflow-hidden bg-primary rounded-lg">
		{#if snippet._type === 'image_asset'}
			<Image
				class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full"
				alt={snippet.alt}
				width={snippet.width}
				height={snippet.height}
				source={snippet.url}
				sizes={{ '2xl': `${1500 / 4}px`, sm: '50vw', md: '25vw' }}
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
	</figure>

	<!-- <div
		class="absolute top-0 left-0 flex flex-col-reverse justify-start w-full h-full gap-4 p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-90 text-primary-less bg-accent2/90"
	>
		<div>
			<h1 class="text-lg leading-snug md:text-4xl">NextHome Sticker App</h1>

			<div class="hidden pt-4 mt-4 prose-sm prose md:block">
				<SimplePortableText blocks={snippet.caption} />
			</div>
		</div>

		<div class="flex flex-row gap-2 pt-4 text-xs font-bold">
			<span class="leading-none">Javascript</span>
			<span class="leading-none">Branding</span>
		</div>
	</div> -->

	<div class="w-full grid grid-cols-2 gap-4 items-baseline p-2">
		<h1 class="font-bold leading-tight">NextHome Sticker App</h1>

		<div class="text-sm">
			<SimplePortableText blocks={snippet.caption} />
		</div>
	</div>

	<button
		on:click={() => {
			openModal = true;
		}}
		type="button"
		aria-label="expand item"
		class="absolute top-0 left-0 w-full h-full z-[1000]"
	/>
</article>

{#if openModal}
	<SnippetModal bind:isOpen={openModal}>
		<div>
			<h1 class="text-lg leading-snug md:text-4xl">NextHome Sticker App</h1>

			<div class="hidden pt-4 mt-4 prose-sm prose md:block">
				<SimplePortableText blocks={snippet.caption} />
			</div>
		</div>

		<div class="flex flex-row gap-2 pt-4 text-xs font-bold">
			<span class="leading-none">Javascript</span>
			<span class="leading-none">Branding</span>
		</div>

		{#if snippet._type === 'image_asset'}
			<Image
				class=""
				alt={snippet.alt}
				width={snippet.width}
				height={snippet.height}
				source={snippet.url}
				sizes={{ '2xl': `${1500 / 4}px`, sm: '50vw', md: '25vw' }}
				config={{
					provider: 'SANITY',
					lqip: snippet.base64Lqip
				}}
			/>
		{/if}

		{#if snippet._type === 'video_asset'}
			<Image
				class=""
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
	</SnippetModal>
{/if}
