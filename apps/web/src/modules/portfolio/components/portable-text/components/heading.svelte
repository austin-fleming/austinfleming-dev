<script lang="ts">
	import type { BlockProps } from '@portabletext/svelte';

	type HeadingLevel = 'heading1' | 'heading2' | 'heading3' | 'heading4';

	export let portableText: BlockProps;

	const { index, blocks, block } = portableText;
	const style = block.style as HeadingLevel;

	// const precededByHeading = ['heading1', 'heading2', 'heading3', 'heading4'].includes(blocks[index - 1]?.style)
</script>

{#if style === 'heading1'}
	<h2><slot /></h2>
{/if}

{#if style === 'heading2'}
	<h3><slot /></h3>
{/if}

{#if style === 'heading3'}
	<h4><slot /></h4>
{/if}

{#if style === 'heading4'}
	<h5><slot /></h5>
{/if}
