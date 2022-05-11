<script lang="ts">
	export let width: 'wide' | 'narrow' = 'wide';
	export let element: 'div' | 'section' | 'article' = 'div';
</script>

<svelte:element
	this={element}
	class:max-w-container={width === 'wide'}
	class:max-w-container-narrow={width === 'narrow'}
	class={`w-full mx-auto p-contentPadding ${$$props.class}`}
>
	<slot />
</svelte:element>
