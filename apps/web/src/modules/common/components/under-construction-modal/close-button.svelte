<button aria-label="close modal" class={`root ${$$props.class}`} type="button" on:click>
	<span class="icon">
		<svg viewBox="0 0 30 30" width="1em" height="1em">
			<path
				fill="currentColor"
				d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
			/>
		</svg>
	</span>

	<span class="label">close</span>
</button>

<style type="text/postcss">
	.root {
		--close-btn-size: 1.75rem;
		--close-btn-size--hovered: calc(var(--close-btn-size) * 3);

		@apply text-background bg-primary;
		@apply relative text-xs w-[var(--close-btn-size)] h-[var(--close-btn-size)] rounded-full leading-none overflow-x-hidden flex flex-row justify-start items-start;
		@apply transition-all duration-300;
	}
	.root:hover,
	.root:target {
		@apply w-[var(--close-btn-size--hovered)];
	}
	.icon {
		@apply absolute top-0 left-0;
		@apply w-[var(--close-btn-size)] h-[var(--close-btn-size)] flex flex-row items-center justify-center;
		@apply opacity-100;
	}
	.label {
		@apply text-xs capitalize tracking-widest absolute pl-[var(--close-btn-size)] pr-[calc(var(--close-btn-size)/2)] w-[var(--close-btn-size--hovered)] h-[var(--close-btn-size)] flex flex-row items-center justify-center;
		@apply opacity-0;
		@apply transition-all duration-300;
	}
	.root:hover .label,
	.root:target .label {
		@apply opacity-100;
	}
</style>
