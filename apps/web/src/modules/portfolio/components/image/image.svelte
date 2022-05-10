<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let imageSource: string;
	export let alt: string;

	let _class = '';
	export { _class as class };
</script>

<figure class={`${_class}`}>
	<img src={imageSource} {alt} class="mb-0" />

	<!-- {#if $$slots.caption || $$slots.attribution} -->
	{#if $$slots.default}
		<figcaption class="m-0 p-0">
			<slot />
		</figcaption>
	{/if}
	<!-- {/if} -->
</figure>
