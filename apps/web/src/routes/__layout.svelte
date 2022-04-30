<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script>

<script lang="ts">
	import PageTransition from '$modules/common/components/page-transition.svelte';
	import SiteNav from '$modules/common/components/site-nav/site-nav.svelte';
	import Context from '$modules/portfolio/context/context.svelte';
	import { blur } from 'svelte/transition';

	export let key: string;
</script>

<Context>
	<SiteNav />

	<div class="bg-gradient-to-br from-gray-700 via-gray-900 to-black min-h-screen">
		<PageTransition refresh={key}>
			<main class="px-8 max-w-[1500px]">
				<slot />
			</main>
		</PageTransition>
	</div>
</Context>

<style>
	.background-gradient {
		@apply bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600;
	}
	.gradient-2 {
		@apply bg-gradient-to-tl from-gray-700 via-gray-900 to-black;
	}
</style>
