<script lang="ts">
	import { onMount } from 'svelte';
	import type { TwttrObject } from './twitter-types';
	// https://twitter.com/mbzfuturegen/status/1486371661251289088?s=20&t=QJnUB0kkpkKlA-veJM8LmQ

	export let tweetId: string;
	export let placeholderHeight: number;

	let tweetMountPoint: HTMLElement;

	let isLoading = true;
	let hasError = false;

	let callbackQueue: (() => void)[] = [];

	const loadTwitterScript = (cb: () => void) => {
		if (callbackQueue.length === 0) {
			const scriptTag = document.createElement('script');
			scriptTag.type = 'text/javascript';
			scriptTag.async = true;
			scriptTag.src = 'https://platform.twitter.com/widgets.js';
			scriptTag.onload = () => callbackQueue.forEach((cb) => cb());
			document.querySelector('head')?.appendChild(scriptTag);
		}

		callbackQueue.push(cb);
	};

	const renderTweet = () => {
		console.log({ twttr: window.twttr });
		// @ts-expect-error: assume "twttr" exists after injecting twitter script link
		const twttr = window.twttr as TwttrObject;
		twttr
			.ready()
			.then(async ({ widgets }) => {
				const element = await widgets.createTweet(tweetId, tweetMountPoint, {
					align: 'center',
					theme: 'dark',
					dnt: true,
					conversation: 'none'
				});

				if (!element) {
					throw new Error('Failed to create tweet element');
				}

				isLoading = false;
				hasError = false;
			})
			.catch((tweetLoadingError) => {
				console.error({ tweetLoadingError });
				isLoading = false;
				hasError = true;
			});
	};

	onMount(() => {
		if (!window.twttr || !window.twttr.ready) {
			console.log({ window });
			loadTwitterScript(renderTweet);
		} else {
			console.log({ window });
			renderTweet();
		}
	});
</script>

<article class="bg-slate-400">
	<div bind:this={tweetMountPoint} />

	{#if isLoading}
		<div
			class="w-full flex flex-col justify-center items-center"
			style="{`height:${placeholderHeight}px;`}}"
		>
			Loading...
		</div>
	{/if}

	{#if hasError}
		<div>Error Loading Tweet</div>
	{/if}
</article>
