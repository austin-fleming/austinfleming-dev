<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';

	export let id: string;
</script>

<section {id} class={`bg-accent1 text-background ${$$props.class}`}>
	<Container>
		<p>👋</p>
		<small>© 2022 Austin Fleming</small>
	</Container>
</section>
