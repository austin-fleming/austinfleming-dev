<script lang="ts">
	import { onMount } from 'svelte';
	import CloseButton from './close-button.svelte';

	const LS_KEY = 'closed-construction-notification';
	const LS_CLOSED_VALUE = 'closed';

	/* TODO: handle global states centrally */
	let isOpen = true;

	onMount(() => {
		const maybeWantsClosed = localStorage.getItem(LS_KEY);

		if (maybeWantsClosed === LS_CLOSED_VALUE) {
			isOpen = false;
		}
	});

	const closeModal = () => {
		localStorage.setItem(LS_KEY, LS_CLOSED_VALUE);
		isOpen = false;
	};
</script>

{#if isOpen}
	<aside
		class="translate-x-full animate-modal fixed bottom-0 right-0 max-w-full w-[40ch] z-modal p-contentPadding mb-header text-background flex flex-col items-end gap-2"
	>
		<CloseButton on:click={closeModal} />

		<div
			class="relative grid items-baseline grid-cols-[2fr_3fr] border-solid bg-accent1/80 backdrop-blur-sm border-section border-primary p-contentPadding"
		>
			<p class="font-bold"><span class="text-[1.5em]">👷‍♂️</span> Howdy!</p>
			<p>I'm in the middle of updates, but feel free to look around!</p>
		</div>
	</aside>
{/if}

<style type="text/postcss">
	.animate-modal {
		@apply animate-[slideIn_0.3s_linear_0.5s_forwards];
	}

	@keyframes slideIn {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0%);
		}
	}
</style>
