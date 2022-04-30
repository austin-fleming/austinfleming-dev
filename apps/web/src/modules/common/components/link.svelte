<script lang="ts">
	let _class: string = '';
	export { _class as class };

	export let to: string;
	export let isExternal = false;

	const properties = {
		target: isExternal ? '_blank' : '_self',
		rel: isExternal ? 'noopener noreferrer nofollow' : ''
	};
</script>

<a href={to} {...properties} class={_class}><slot /></a>
