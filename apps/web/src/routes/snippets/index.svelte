<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	// import Snippet from '$modules/portfolio/components/snippets/snippet.svelte';
	import Snippets from '$modules/portfolio/components/snippets/snippets.svelte';
	import type { SnippetsPage } from '$modules/portfolio/infra/models/snippets-page';

	export let snippetsPage: SnippetsPage;
</script>

<section class="px-sitepad bg-background">
	<Snippets snippets={snippetsPage.snippets} />
</section>
