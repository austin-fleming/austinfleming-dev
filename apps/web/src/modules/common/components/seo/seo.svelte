<script lang="ts">
	import JsonLd from './json-ld.svelte';

	type SeoProperties = {
		canonicalUrl: string;
		type: 'article';
	};

	export let config: SeoProperties;
</script>

<svelte:head>
	<link rel="canonical" href={config.canonicalUrl} />
	<JsonLd contentType={config.type} />
</svelte:head>
