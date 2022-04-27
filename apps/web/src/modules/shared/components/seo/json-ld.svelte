<script lang="ts">
	import { buildArticleJsonLd } from './build-json-ld';
	import { serializeJsonLd } from './serialize-json-ld';

	export let type: 'Article';
</script>

<svelte:head>
	{@html serializeJsonLd(buildArticleJsonLd(config))}
</svelte:head>
