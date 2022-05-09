<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script> -->
<script lang="ts">
	import Context from '$modules/portfolio/context/context.svelte';
</script>

<Context>
	<nav
		class="border-t-section border-solid border-primary fixed right-0 bottom-0 left-0 bg-background/80 backdrop-blur-sm text-primary z-headerPrimary flex flex-row justify-center items-center gap-4 text-base font-bold px-4 h-header leading-none"
	>
		<a sveltekit:noscroll href="/">Home</a>
		<a href="/#work">Work</a>
		<a sveltekit:noscroll href="/snippets">Archive</a>
		<a sveltekit:noscroll href="/#contact">Contact</a>
	</nav>

	<slot />
</Context>
