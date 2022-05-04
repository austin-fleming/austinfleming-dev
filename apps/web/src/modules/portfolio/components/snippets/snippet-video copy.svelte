<script lang="ts">
	import type { SimpleBlockText } from '$modules/portfolio/infra/models/fragments/simple-block-text';
	import * as pkg from '@vime/svelte';
	const { Player, Hls, DefaultUi } = pkg;

	/* 
	NOTE:
	HLS component from Vime requires there to be at least (1) script tag in the head of the document.
	The library has to insert a cdn link for hls.js if it's not natively supported. It finds the first
	script tag in the head and inserts the link before it. Therefore, the player will crash if cannot
	find a script tag. 
	*/
	import { onMount, SvelteComponent } from 'svelte';
	import SimplePortableText from '../portable-text/simple-portable-text.svelte';
	// Only needed for typing variable declarations. Actual import occurs on mount.

	export let videoData: {
		posterUrl: string;
		hlsSource: string;
		aspectRatio: number;
		title: string;
		attribution?: string;
		caption?: SimpleBlockText;
	};
	export let playerOptions: {
		loop?: boolean;
		muted?: boolean;
	} = {};

	// HACK: use of "any" due to the dynamic import of vime modules
	let videoPlayer: any;
</script>

<figure class="w-full relative">
	<Player
		class="w-full"
		style="--vm-player-border-radius: 1em;"
		loop
		muted
		autoplay
		bind:this={videoPlayer}
	>
		<Hls crossOrigin="anonymous" version="latest" poster={videoData.posterUrl}>
			<source data-src={videoData.hlsSource} type="application/x-mpegURL" />
		</Hls>
		<DefaultUi />
	</Player>

	{#if videoData.attribution || videoData.caption}
		<figcaption>
			{#if videoData.attribution}
				<small>{videoData.attribution}</small>
			{/if}

			{#if videoData.caption}
				<div><SimplePortableText blocks={videoData.caption} /></div>
			{/if}
		</figcaption>
	{/if}
</figure>
