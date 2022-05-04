<script lang="ts">
	import type { Breadcrumb } from '$modules/portfolio/infra/models/fragments/breadcrumb';

	import Icon from '../icons/icon.svelte';
	import Link from '../link.svelte';

	export let crumbs: Breadcrumb[];
	let _class = '';
	export { _class as class };
</script>

<nav class={`flex flex-row text-sm font-bold items-center leading-none gap-1 ${_class}`}>
	{#each crumbs as { to, label }, index (to)}
		<!-- {#if index > 0}
			<Icon name="caretRight" />
		{/if} -->
		<Link class="text-primary-less hover:text-accent1 transition" {to}>{label}</Link>
		<Icon name="caretRight" />
	{/each}
</nav>
