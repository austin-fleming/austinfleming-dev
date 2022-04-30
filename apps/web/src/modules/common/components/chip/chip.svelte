<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: 'primary' | 'accent' = 'primary';
</script>

<div
	class="root"
	class:size--sm={size === 'sm'}
	class:size--md={size === 'md'}
	class:size--lg={size === 'lg'}
	class:color--primary={color === 'primary'}
	class:color--accent={color === 'accent'}
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
</style>
