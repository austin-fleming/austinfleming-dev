<script lang="ts">
	import ThemeButton from '$modules/common/components/theme-button/theme-button.svelte';
	import { navigationConfig } from '$config/navigation.config';
</script>

<header
	class="fixed bottom-4 right-auto left-1/2 -translate-x-1/2 bg-primary rounded-xl z-headerPrimary"
>
	<nav class="flex flex-row text-base px-[1em]">
		{#each navigationConfig.items as { to, label } (label)}
			<a
				class="px-[1em] py-[1.25em] leading-none text-background font-bold hover:text-accent1"
				href={to}
				sveltekit:prefetch>{label}</a
			>
		{/each}
	</nav>
	<!-- 	<ThemeButton /> -->
</header>
