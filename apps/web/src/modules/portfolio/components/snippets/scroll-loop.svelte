<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	let loopContainer: HTMLElement;
	let scrollY: number;

	let scrollHeight = 0;
	let scrollPosition = 0;
	let clonesHeight = 0;

	let currentIndex = 0;

	let test: number;

	let component: SvelteComponent;

	$: {
		test = scrollY;
	}
</script>

<svelte:window bind:scrollY />

<div bind:this={loopContainer}>
	<svelte:component this={component} />
	<svelte:component this={component} />
</div>
