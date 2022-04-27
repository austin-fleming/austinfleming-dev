<script lang="ts">
	import Image from '$modules/shared/components/image.svelte';
	import type { Casestudy } from '$modules/shared/infra/models/casestudy';

	export let casestudies: Casestudy[];
</script>

<section class="w-full h-screen p-4">
	<div class="w-full h-full bg-teal-300 rounded-xl" />
</section>

<section>
	{#each casestudies as casestudy (casestudy.id)}
		<article>
			<h1>{casestudy.title}</h1>

			<figure>
				<img src={casestudy.featuredImage.url} alt={casestudy.featuredImage.alt} />
			</figure>
		</article>
	{/each}
</section>
