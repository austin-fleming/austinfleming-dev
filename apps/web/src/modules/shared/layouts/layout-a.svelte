<script>
	import SiteNav from '$modules/shared/components/site-nav/site-nav.svelte';
	import Context from '$modules/shared/context/context.svelte';
</script>

<Context>
	<SiteNav />

	<main class="max-w-full overflow-x-hidden bg-background">
		<slot />
	</main>
</Context>
