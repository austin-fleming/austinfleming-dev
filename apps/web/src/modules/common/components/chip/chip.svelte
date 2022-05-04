<script lang="ts">
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
	export let color: 'primary' | 'accent' | 'inverted' = 'primary';

	let _class = '';
	export { _class as class };
</script>

<div
	class={`root ${_class}`}
	class:size--xs={size === 'xs'}
	class:size--sm={size === 'sm'}
	class:size--md={size === 'md'}
	class:size--lg={size === 'lg'}
	class:color--primary={color === 'primary'}
	class:color--accent={color === 'accent'}
	class:color--inverted={color === 'inverted'}
>
	<span class="content"><slot /></span>
</div>

<style>
	.root {
		@apply px-[1.5em] pt-[0.65em] pb-[0.75em] leading-none whitespace-nowrap flex flex-row justify-center items-center rounded-full;
	}

	.content {
		@apply leading-none tracking-wider;
	}
	.size--xs {
		@apply text-[0.65rem];
	}
	.size--sm {
		@apply text-xs;
	}
	.size--md {
		@apply text-sm;
	}
	.size--lg {
		@apply text-base;
	}

	.color--primary {
		@apply text-background bg-primary;
	}
	.color--accent {
		@apply text-background bg-accent1;
	}
	.color--inverted {
		@apply text-primary bg-background;
	}
</style>
