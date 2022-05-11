<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';

	export let id: string;

	export let offsetHeight: number;
</script>

<section
	{id}
	class={`w-full h-[50vh] min-h-[50vh] bg-accent2 flex flex-col ${$$props.class}`}
	bind:offsetHeight
>
	<Container
		class="absolute top-0 left-0 right-0 flex flex-row items-center py-0 text-base leading-none h-header"
	>
		<h2>recent work</h2>
	</Container>

	<Container class="flex flex-col items-start justify-center flex-1 h-full text-primary-less">
		<p class="text-4xl max-w-[15ch] md:text-6xl">See what I've been working on recently.</p>
	</Container>
</section>
