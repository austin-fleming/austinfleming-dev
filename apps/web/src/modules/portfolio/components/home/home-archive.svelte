<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';

	export let id: string;
</script>

<section {id} class={`h-[50vh] min-h-[50vh] bg-background text-primary ${$$props.class}`}>
	<Container>
		<p>There's more.</p>
		<p>You can find additional projects in the archive.</p>
	</Container>
</section>
