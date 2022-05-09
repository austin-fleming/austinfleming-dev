<script lang="ts">
	export let id: string;
	let _class: string;
	export { _class as class };
</script>

<section {id} class={`bg-background text-primary ${_class}`}>
	<div class="p-contentPadding">
		<p>Hi!</p>
		<p>I'm a front-leaning, full-stack dev located in San Diego, California.</p>
	</div>
</section>
