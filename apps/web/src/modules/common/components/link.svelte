<script lang="ts">
	let _class: string = '';
	export { _class as class };

	export let to: string;
	export let isExternal = false;
	export let prefetch = true;
	export let noscroll = false;

	const properties = isExternal ? { rel: 'noopener noreferrer nofollow', target: '_blank' } : {};
</script>

<a
	sveltekit:prefetch={prefetch ? undefined : null}
	sveltekit:noscroll={noscroll ? undefined : null}
	href={to}
	{...properties}
	class={_class}><slot /></a
>
