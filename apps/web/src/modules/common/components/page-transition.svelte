<script lang="ts">
	import { blur, type TransitionConfig } from 'svelte/transition';
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
				const eased = cubicIn(t);
				const easedInverted = cubicIn(u);

				return `
          transform: translateY(${easedInverted * 100}vh);
					border-radius: 2rem;
        `;
			}
		};
	};
</script>

{#key refresh}
	<div
		class="min-h-screen bg-background"
		in:pageSlideUp={{ duration: 500, delay: 750 }}
		out:pageFuzzOut={{ duration: 500 }}
	>
		<div>
			<slot />
		</div>
	</div>
{/key}
