<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let imageSource: string;
	export let alt: string;
</script>

<figure>
	<img src={imageSource} {alt} class="mb-0" />

	<!-- {#if $$slots.caption || $$slots.attribution} -->
	{#if $$slots.default}
		<figcaption class="m-0 p-0">
			<slot />
		</figcaption>
	{/if}
	<!-- {/if} -->
</figure>
