<script lang="ts">
	export let id: string;
	let _class = '';
	export { _class as class };
</script>

<section {id} class={`h-[50vh] min-h-[50vh] bg-background text-primary ${_class}`}>
	<div class="p-contentPadding">
		<p>There's more.</p>
		<p>You can find additional projects in the archive.</p>
	</div>
</section>
