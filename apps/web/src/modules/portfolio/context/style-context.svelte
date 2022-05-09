<script lang="ts">
	import '$styles/app.css';
</script>

<svelte:head>
	<!-- <link
		rel="preload"
		href="/fonts/manrope-variable.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/> -->
	<!-- <link
		rel="preload"
		href="/fonts/Inter.var.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/> -->
	<link
		rel="preload"
		href="/fonts/primary-400.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/primary-400-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/primary-700.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/primary-700-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/primary-900.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/primary-900-italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<slot />
