<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	export let refresh = '';

	type TransitionReturnValue = {
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
	};

	const pageSlideUp = (
		node: HTMLElement,
		{ duration, delay }: TransitionConfig
	): TransitionReturnValue => {
		return {
			duration,
			delay,
			css: (t, u) => {
				const eased = cubicOut(t);
				const easedInverted = cubicIn(u);
				return `
          transform: translateY(${easedInverted * 100}vh) scale(${0.97 + eased * 0.03});
          
					border-radius: ${easedInverted * 2}rem ${easedInverted * 2}rem 0 0;
        `;
			}
		};
	};
</script>

{#key refresh}
	<!-- HACK: min-h value assures there's always a scrollbar -->
	<div
		class="min-h-[100.1vh]"
		in:pageSlideUp={{ duration: 500, delay: 750 }}
		out:pageFuzzOut={{ duration: 500 }}
	>
		<div>
			<slot />
		</div>
	</div>
{/key}
