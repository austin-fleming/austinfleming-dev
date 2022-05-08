<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Link from '$modules/common/components/link.svelte';
	import type { HomePage } from '$modules/portfolio/infra/models/home-page';

	export let homePage: HomePage;
</script>

<section
	class="w-full min-h-screen px-sitepad flex flex-col gap-12 justify-center items-center text-center opacity-90"
>
	<h1 class="w-full text-6xl md:text-[10vw] font-black tracking-tight">Austin Fleming</h1>
	<p class="">Front-leaning webdev with a background in architecture</p>

	<ul>
		<li>
			<Link
				class="underline text-primary-less mt-6 hover:text-primary-lesser transition-colors"
				prefetch
				to="/case-studies">Recent Work</Link
			>
		</li>

		<li>
			<Link
				class="underline text-primary-less mt-6 hover:text-primary-lesser transition-colors"
				isExternal
				to="https://www.linkedin.com/in/john-austin-fleming/">LinkedIn</Link
			>
		</li>

		<li>
			<Link
				class="underline text-primary-less mt-6 hover:text-primary-lesser transition-colors"
				isExternal
				to="https://github.com/austin-fleming">Github</Link
			>
		</li>
	</ul>
</section>

<style>
</style>
