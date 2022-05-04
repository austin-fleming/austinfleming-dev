<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
</script>

<section class="root">
	<div class="backdrop" />
	<div class="modalContent" out:fly={{ duration: 150, y: 30 }}>
		<slot />
	</div>
</section>

<style>
	.root {
		@apply fixed top-0 right-0 left-0 h-screen z-modal;
	}

	/* .backdrop {
		@apply absolute w-full h-full top-0 right-0 bottom-0 left-0 bg-primary opacity-95;
	} */

	/* @keyframes backdropColor {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.5;
		}
	} */

	.modalContent {
		@apply bg-background relative w-full h-full flex flex-col justify-center items-center p-8 z-10;
		/* @apply translate-y-[100vh]; */
		@apply animate-[modalContentSlide_0.2s_ease-in-out_forwards];
	}

	@keyframes modalContentSlide {
		0% {
			transform: translateY(100%);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
