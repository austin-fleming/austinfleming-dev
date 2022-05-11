<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';

	export let id: string;
</script>

<section {id} class={`bg-background text-primary ${$$props.class}`}>
	<Container class="grid items-baseline grid-cols-1 sm:grid-cols-2">
		<h2 class="text-4xl pb-[1em] sm:pb-0">Hi!</h2>
		<p class="text-lg">I'm a front-leaning, full-stack dev located in San Diego, California.</p>
	</Container>
</section>
