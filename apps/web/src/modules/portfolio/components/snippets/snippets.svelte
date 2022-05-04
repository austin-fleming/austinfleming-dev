<script lang="ts">
	import type { Snippet as SnippetType } from '$modules/portfolio/infra/models/snippets-page';
	import { onMount, setContext } from 'svelte';
	import ScrollLoop from './scroll-loop.svelte';
	import Snippet from './snippet.svelte';

	export let snippets: SnippetType[];

	//

	let loopContainer: HTMLDivElement;
	let scrollY: number;

	let scrollHeight = 0;
	let scrollPosition = 0;
	let clonesHeight: number;
	let containerHeight: number;

	let currentIndex = 0;

	let scrollable = true;

	const handleScroll = () => {
		if (clonesHeight + scrollY >= containerHeight) {
			window.scrollTo(0, 0);
			scrollable = false;
		}

		if (!scrollable) {
			window.setTimeout(() => {
				scrollable = true;
			}, 50);
		}
	};

	const wheel = (node, options) => {
		let { scrollable } = options;

		const handler = (e) => {
			if (!scrollable) e.preventDefault();
		};

		node.addEventListener('wheel', handler, { passive: false });

		return {
			update(options) {
				scrollable = options.scrollable;
			},
			destroy() {
				node.removeEventListener('wheel', handler, { passive: false });
			}
		};
	};

	// NOTE: Optimization to eager-load the first snippet to improve lighthouse score. Consumer in snippet.
	setContext('first-snippet-id', snippets[0].id);
</script>

<svelte:window bind:scrollY on:scroll={handleScroll} use:wheel={{ scrollable }} />

<div class="" bind:this={loopContainer} bind:clientHeight={containerHeight}>
	<div class="project-group">
		{#each snippets as snippet (snippet.id)}
			<Snippet {snippet} />
		{/each}
	</div>

	<div class="project-group" bind:clientHeight={clonesHeight}>
		{#each snippets as snippet (snippet.id)}
			<Snippet {snippet} class="scroll-clone" />
		{/each}
	</div>
</div>

<style>
	.project-group {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2;
	}
</style>
