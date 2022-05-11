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

	<div class="relative w-full h-full p-contentPadding">
		<!-- <div class="relative w-full h-full p-contentPadding border-[1rem] border-solid border-background"> -->

		<!-- <img
			class="absolute top-0 right-0 object-cover object-center w-1/2 h-full overflow-hidden border-solid border-l-section border-background"
			src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
			alt="placeholder"
		/> -->

		<!-- <div
			class="absolute top-0 right-0 object-cover object-center w-1/2 h-full overflow-hidden border-solid border-l-section border-background"
		/> -->

		<h1 class="text-2xl font-bold leading-none text-background">© 2022 Austin Fleming</h1>
		<!-- <div class="w-1/2 h-full border-solid border-section border-background p-contentPadding">
		</div> -->
	</div>
</section>
