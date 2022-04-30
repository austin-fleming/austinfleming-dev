<script>
	import StyleContext from './style-context.svelte';
	import ThemeContext from './theme-context.svelte';
</script>

<StyleContext>
	<ThemeContext>
		<slot />
	</ThemeContext>
</StyleContext>
