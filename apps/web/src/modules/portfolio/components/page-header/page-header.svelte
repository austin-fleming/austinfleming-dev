<script lang="ts">
	import type { Breadcrumb } from '$modules/portfolio/infra/models/fragments/breadcrumb';
	import type { SimpleBlockText } from '$modules/portfolio/infra/models/fragments/simple-block-text';

	export let breadcrumbs: Breadcrumb;
	export let subBreadcrumbs: string | undefined = undefined;
	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let summary: SimpleBlockText | undefined = undefined;

	let containerClasses = '';
</script>

<header class={`content-wide flex flex-col gap-8 ${containerClasses}`}>
	{#if breadcrumbs}
		<div />
	{/if}
</header>
