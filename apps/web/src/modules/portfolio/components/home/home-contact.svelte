<script lang="ts">
	import Icon from '$modules/common/components/icons/icon.svelte';
	import Link from '$modules/common/components/link.svelte';

	export let id: string;
	let _class = '';
	export { _class as class };

	const socialProfiles = [
		{
			platform: 'linkedin',
			url: 'https://www.linkedin.com/in/john-austin-fleming/'
		},
		{
			platform: 'github',
			url: 'https://github.com/austin-fleming'
		}
	];
</script>

<section {id} class={`bg-primary text-background grid grid-cols-2 gap-contentPadding ${_class}`}>
	<div class="p-contentPadding">
		<h2>contact me</h2>
	</div>

	<div class="p-contentPadding flex flex-row flex-wrap gap-contentPadding">
		{#each socialProfiles as { platform, url } (url)}
			<Link
				class="w-full flex flex-row items-center leading-none gap-[1em] px-[1.5em] py-[1em] rounded-[0.5em] text-sm font-bold text-background border-2 border-background border-solid hover:bg-accent1 transition-colors duration-200"
				isExternal
				to={url}><Icon class="text-[2em]" name={platform} />{platform}</Link
			>
		{/each}
	</div>
</section>
