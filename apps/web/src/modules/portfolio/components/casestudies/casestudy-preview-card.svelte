<script lang="ts">
	import type { Casestudy } from '$modules/portfolio/infra/models/casestudy';
	import Chip from '../../../common/components/chip/chip.svelte';
	import SimplePortableText from '../portable-text/simple-portable-text.svelte';
	export let casestudy: Casestudy;
</script>

<article class="relative">
	<figure class="relative w-full pb-[125%] overflow-hidden rounded-xl">
		<img
			class="absolute w-full h-full top-0 right-0 bottom-0 left-0 object-cover object-center"
			src={casestudy.featuredImage.url}
			alt={casestudy.featuredImage.alt}
		/>
	</figure>

	<div class="p-3">
		<h1 class="font-bold">{casestudy.title}</h1>

		<div class="absolute top-0 right-0 flex flex-col gap-2">
			{#each casestudy.tags as tag (tag.title)}
				<Chip size="sm">{tag.title}</Chip>
			{/each}
		</div>
	</div>

	<a class="block absolute w-full h-full top-0 right-0 bottom-0 left-0" href={casestudy.path}
		><span class="sr-only">View case study</span></a
	>
</article>
