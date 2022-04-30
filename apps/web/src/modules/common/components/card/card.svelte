<script lang="ts">
	import { isExternal } from 'util/types';
	import Link from '../link.svelte';

	export let link:
		| {
				to: string;
				isExternal?: boolean;
		  }
		| undefined = undefined;
</script>

<article class="root">
	<slot />
	{#if link}
		<Link to={link.to} isExternal={link.isExternal} class="link-overlay">
			<span class="sr-only">View case study</span>
		</Link>
	{/if}
</article>

<style>
	.root {
		@apply relative w-full;
	}

	.link-overlay {
		@apply block absolute w-full h-full top-0 right-0 bottom-0 left-0;
	}
</style>
