<script lang="ts">
	export let id: string;
	let _class = '';
	export { _class as class };
</script>

<section {id} class={`bg-accent1 text-background ${_class}`}>
	<div class="p-contentPadding">
		<p>👋</p>
		<small>© 2022 Austin Fleming</small>
	</div>
</section>
