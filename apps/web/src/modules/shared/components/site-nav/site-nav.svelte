<script lang="ts">
	import { navigationConfig } from '$config/navigation-config';
	import ThemeButton from '$modules/shared/components/theme-button/theme-button.svelte';
</script>

<header
	class="fixed bottom-4 right-auto left-1/2 -translate-x-1/2 bg-slate-400 rounded-xl z-headerPrimary"
>
	<nav class="flex flex-row text-base px-[1em]">
		{#each navigationConfig.items as { to, label } (label)}
			<a class="px-[1em] py-[1.25em] leading-none font-bold hover:text-accent1" href={to}>{label}</a
			>
		{/each}
	</nav>
	<ThemeButton />
</header>
