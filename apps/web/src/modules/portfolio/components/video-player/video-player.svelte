<script lang="ts">
	import type { SimpleBlockText } from '$modules/portfolio/infra/models/fragments/simple-block-text';

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
	import type { PlayerType, HlsType, DefaultUiType, VideoType } from './vime';

	export let videoData: {
		posterUrl: string;
		mp4Source: string;
		aspectRatio: number;
		title: string;
		attribution?: string;
		caption?: SimpleBlockText;
	};
	export let playerOptions: {
		loop?: boolean;
		muted?: boolean;
	} = {};
	let _class = '';
	export { _class as class };

	let Player: PlayerType;
	let Hls: HlsType;
	let DefaultUi: DefaultUiType;
	let Video: VideoType;

	// HACK: use of "any" due to the dynamic import of vime modules
	let videoPlayer: any;
	let showPlayer = false;

	onMount(async () => {
		({ Player, Hls, DefaultUi, Video } = await import('./vime'));

		showPlayer = true;
	});
</script>

<div class={`w-full relative not-prose ${_class}`}>
	{#if showPlayer && Player}
		<svelte:component
			this={Player}
			class="w-full"
			loop
			muted
			autoplay
			bind:this={videoPlayer}
			on:vmPlaybackReady={async (e) => {
				const canAutoplay = await videoPlayer.canAutoplay();
				const canMutedAutoplay = await videoPlayer.canMutedAutoplay();

				videoPlayer.play();
			}}
		>
			<svelte:component this={Video}>
				<source data-src={videoData.mp4Source} type="video/mp4" />
			</svelte:component>
			<svelte:component this={DefaultUi} />
		</svelte:component>
	{:else}
		<div class="relative">
			<img src={videoData.posterUrl} alt={videoData.title} />
		</div>
	{/if}
</div>
