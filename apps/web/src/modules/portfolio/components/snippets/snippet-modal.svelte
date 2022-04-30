<script lang="ts">
	/* type TransitionReturnValue = {
		duration?: number;
		delay?: number;
		css?: (tick: number, nextTick: number) => string;
		easing?: (value: number) => number;
	};

	const pageFuzzOut = (
		node: HTMLElement,
		{ duration }: TransitionConfig
	): TransitionReturnValue => {
		return {
			duration,
			css: (t, u) => {
				const eased = cubicOut(t);
				const easedInverted = cubicOut(u);

				return `
          filter: blur(${easedInverted * 20}px);
          opacity: ${1 - easedInverted * 1};
        `;
			}
		};
	}; */

	import { fade, fly, slide } from 'svelte/transition';
</script>

<section class="root">
	<div class="backdrop" />
	<div class="modalContent">
		<slot />
	</div>
</section>

<style>
	.root {
		@apply fixed top-0 right-0 left-0 h-screen z-modal p-4;
	}

	.backdrop {
		@apply bg-primary opacity-0 absolute top-0 right-0 bottom-0 left-0;
		@apply animate-[backdropColor_0.3s_ease-in_forwards];
	}

	@keyframes backdropColor {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.5;
		}
	}

	.modalContent {
		@apply relative w-full h-full bg-background rounded-2xl flex flex-col justify-center items-center px-[10%] py-[10%] z-10;
		/* @apply translate-y-[100vh]; */
		@apply animate-[modalContentSlide_0.3s_ease-in-out_forwards];
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
