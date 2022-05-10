<script lang="ts">
	import BackgroundAnimation from '$modules/common/components/background-animation/background-animation.svelte';

	export let id: string;
	let _class = '';
	export { _class as class };
</script>

<section
	{id}
	class={`heightScreenFix minHeightScreenFix bg-accent1 flex flex-col justify-start ${_class}`}
>
	<BackgroundAnimation />

	<div class="p-contentPadding">
		<h1 class="text-2xl font-bold text-background">© 2022 Austin Fleming</h1>
	</div>
</section>
