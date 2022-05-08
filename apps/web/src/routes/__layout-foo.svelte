<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script>

<script lang="ts">
	import SiteNav from '$modules/common/components/site-nav/site-nav.svelte';
	import Context from '$modules/portfolio/context/context.svelte';

	export let key: string;
</script>

<Context>
	<SiteNav />

	<main class="w-full bigreset">
		<slot />
	</main>
</Context>

<style>
	.background-gradient {
		@apply bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600;
	}
	.gradient-2 {
		@apply bg-gradient-to-tl from-gray-700 via-gray-900 to-black;
	}
</style>
