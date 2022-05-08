<script lang="ts">
	import { page } from '$app/stores';
	import { navigationConfig } from '$config/navigation.config';
	// import { onMount } from 'svelte';
	// import ThemeButton from '../theme-button/theme-button.svelte';

	/* let currentPath = '';

	onMount(() => {
		currentPath = window.location.pathname;
	}); */
</script>

<header class="fixed right-0 bottom-4 left-0 w-full flex flex-col items-center z-headerPrimary">
	<nav
		class="grid grid-flow-col auto-cols-fr justify-center items-center text-sm md:text-base bg-primary/75 backdrop-blur-sm rounded-full px-[1em] h-12 md:h-14"
	>
		{#each navigationConfig.items as { to, label } (label)}
			<a
				class="relative block px-[0.5em] leading-none text-background text-center font-bold hover:opacity-50 transition-opacity duration-200"
				class:current={$page.url.pathname === to}
				href={to}
				sveltekit:prefetch>{label}</a
			>
		{/each}
	</nav>
	<!-- <ThemeButton /> -->
</header>

<style>
	.current:before {
		content: '';
		@apply absolute -bottom-[10px] left-1/2 -translate-x-1/2 h-[6px] w-[6px] rounded-full bg-background;
	}
</style>
