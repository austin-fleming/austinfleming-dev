<script lang="ts">
	import SanityProvider from './providers/sanity.provider.svelte';
	import MuxProvider from './providers/mux.provider.svelte';
	import type { breakpointsConfig } from '$config/breakpoints.config';

	type Breakpoints = keyof typeof breakpointsConfig;

	type SanityImageConfig = {
		provider: 'SANITY';
		lqip: string;
	};

	type MuxImageConfig = {
		provider: 'MUX';
		time?: number;
	};

	type Config = SanityImageConfig | MuxImageConfig;

	let _class = '';
	export { _class as class };

	export let sizes: Partial<Record<Breakpoints, string>> = {};
	export let config: Config;
	export let preload = false;
	export let alt: string;
	export let width: number;
	export let height: number;
	export let source: string;
	export let quality: number = 0;
</script>

{#if config.provider === 'SANITY'}
	<SanityProvider
		class={_class}
		{preload}
		{alt}
		lqip={config.lqip}
		{width}
		{height}
		{sizes}
		{source}
		{quality}
	/>
{/if}

{#if config.provider === 'MUX'}
	<MuxProvider
		class={_class}
		{preload}
		{alt}
		time={config.time}
		{width}
		{height}
		{sizes}
		thumbnailUrl={source}
	/>
{/if}
