<script lang="ts">
	export let id: string;
	let _class = '';
	export { _class as class };
</script>

<section {id} class={`minHeightScreenFix bg-background ${_class}`}>
	<div class="p-contentPadding">
		<h2>Contact Me</h2>
	</div>
</section>
