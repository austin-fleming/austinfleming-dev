<script lang="ts">
	export let id: string;
	let _class = '';
	export { _class as class };

	export let offsetHeight: number;
</script>

<section
	{id}
	class={`w-full h-[50vh] min-h-[50vh] bg-accent2 flex flex-col ${_class}`}
	bind:offsetHeight
>
	<span
		class="absolute top-0 left-0 right-0 px-contentPadding h-header flex flex-row items-center text-base leading-none"
	>
		<h2>recent work</h2>
	</span>

	<div
		class="p-contentPadding h-full flex-1 flex flex-col items-start justify-center text-primary-less"
	>
		<p class="text-4xl max-w-[11ch] md:text-6xl md:max-w-[50vw]">
			See what I've been working on recently.
		</p>
	</div>
</section>
