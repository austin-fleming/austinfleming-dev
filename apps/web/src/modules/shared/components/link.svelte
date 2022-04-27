<script lang="ts">
	export let to: string;
	export let isExternal = false;

	const properties = {
		target: isExternal ? '_blank' : '_self',
		rel: isExternal ? 'noopener noreferrer nofollow' : ''
	};
</script>

<a href={to} {...properties}><slot /></a>
