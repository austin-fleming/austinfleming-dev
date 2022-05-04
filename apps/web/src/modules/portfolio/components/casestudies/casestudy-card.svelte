<script lang="ts">
	import Icon from '$modules/common/components/icons/icon.svelte';
	import Image from '$modules/common/components/image/image.svelte';

	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
	import Chip from '../../../common/components/chip/chip.svelte';

	export let casestudy: Casestudy;
	export let preload = false;
</script>

<a class="group relative block w-full" href={casestudy.path} sveltekit:prefetch>
	<article
		class="relative scale-100 translate-y-0 group-hover:scale-[99%] group-hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col-reverse"
	>
		<div class="px-4 text-base mt-[0.25em] flex flex-row w-full justify-between">
			<h1 class="font-bold leading-snug">{casestudy.title}</h1>
		</div>

		<figure class="relative w-full overflow-hidden">
			<Image
				class="group-hover:opacity-50 group-focus:opacity-50 transition-opacity duration-500 rounded-xl"
				source={casestudy.featuredImage.url}
				alt={casestudy.featuredImage.alt}
				width={casestudy.featuredImage.width}
				height={casestudy.featuredImage.width * 1.25}
				{preload}
				config={{ provider: 'SANITY', lqip: casestudy.featuredImage.base64Lqip }}
			/>

			<figcaption
				class="absolute top-4 right-4 bottom-4 left-4 flex flex-col justify-between opacity-0 group-hover:opacity-90 group-focus:opacity-90 transition-opacity duration-500"
			>
				<div class="text-sm font-bold  flex flex-row justify-between">
					<p class="max-w-[15ch]">{casestudy.shortSummary}</p>
					<Icon name="arrowUpRight" class="text-6xl text-primary" />
				</div>

				<div class="w-full flex flex-row flex-wrap gap-1 font-bold items-start">
					{#each casestudy.tags as { title, id } (id)}
						<Chip size="xs">{title}</Chip>
					{/each}
				</div>
			</figcaption>
		</figure>
	</article>
</a>

<style>
</style>
