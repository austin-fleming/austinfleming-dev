<script lang="ts">
	export let id: string;
	let _class: string;
	export { _class as class };
</script>

<section {id} class={`bg-background text-primary ${_class}`}>
	<div class="p-contentPadding grid grid-cols-1 sm:grid-cols-2 items-baseline">
		<h2 class="text-4xl pb-[1em] sm:pb-0">Hi!</h2>
		<p class="text-lg">I'm a front-leaning, full-stack dev located in San Diego, California.</p>
	</div>
</section>
