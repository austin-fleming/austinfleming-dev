<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ error, status }) => {
		return {
			props: {
				status // same as status: status
			}
		};
	};
</script>

<script lang="ts">
	import Link from '$modules/common/components/link.svelte';
	import DesertGraphic from '$modules/portfolio/components/graphics/desert-graphic.svelte';
	import RainGraphic from '$modules/portfolio/components/graphics/rain-graphic.svelte';

	export let status: number;
</script>

{#if status === 404}
	<section class="relative w-full min-h-screen flex flex-col gap-8 items-center justify-center p-4">
		<figure class="absolute right-0 bottom-0 left-0 text-accent1 -z-10">
			<DesertGraphic
				class="w-full blur-[1px] md:blur-[4px]"
				fillClass="fill-current"
				strokeClass="fill-background"
				sunClass="fill-accent1-lesser"
			/>
		</figure>

		<div>
			<h1 class="text-7xl text-center font-bold">404</h1>
			<h2 class="text-xl text-center font-bold">Nothing's here</h2>
		</div>

		<Link class="text-base text-center underline" to="/">Go Home</Link>
	</section>
{:else}
	<section class="relative w-full min-h-screen flex flex-col gap-8 items-center justify-center p-4">
		<figure class="absolute -left-1/2 top-0 -right-1/2 sm:left-0 sm:right-0 -z-10">
			<RainGraphic class="blur-[2px]" />
		</figure>
		<div>
			<h1 class="text-7xl text-center font-bold">{status}</h1>
			<h2 class="text-xl text-center font-bold max-w-[20ch]">
				Looks like the server is feeling under the weather
			</h2>
		</div>

		<Link class="text-base text-center underline" to="/">Go Home</Link>
	</section>
{/if}
