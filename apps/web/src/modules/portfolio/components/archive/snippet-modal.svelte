<script>
	import Container from '$modules/common/components/container/container.svelte';
	import CloseButton from '$modules/common/components/under-construction-modal/close-button.svelte';

	export let isOpen;
</script>

<article
	class="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-primary/10 z-modal p-contentPadding"
>
	<Container
		class="relative flex flex-col h-full overflow-y-scroll border-solid bg-background border-section border-primary"
	>
		<div>
			<slot />
		</div>

		<CloseButton
			class="important:absolute top-0 right-0 z-[9999]"
			on:click={() => (isOpen = false)}
		/>
		<!-- TODO: globalize this -->
	</Container>
</article>
