<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script> -->
<script lang="ts">
	import UnderConstructionModal from '$modules/common/components/under-construction-modal/under-construction-modal.svelte';
	import Context from '$modules/portfolio/context/context.svelte';
</script>

<Context>
	<UnderConstructionModal />

	<nav
		class="fixed bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-4 px-4 text-base font-bold leading-none border-solid border-t-section border-primary bg-background text-primary z-headerPrimary h-header"
	>
		<a sveltekit:noscroll href="/">Home</a>
		<a href="/#work">Work</a>
		<a sveltekit:noscroll href="/snippets">Archive</a>
		<a sveltekit:noscroll href="/#contact">Contact</a>
	</nav>

	<slot />
</Context>
