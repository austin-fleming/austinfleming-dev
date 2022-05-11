<script lang="ts">
	import Container from '$modules/common/components/container/container.svelte';
	import Icon from '$modules/common/components/icons/icon.svelte';
	import Link from '$modules/common/components/link.svelte';

	export let id: string;

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

<section {id} class={`bg-primary text-background ${$$props.class}`}>
	<Container class="grid grid-cols-2 gap-contentPadding">
		<h2>contact me</h2>

		<div class="flex flex-row flex-wrap gap-contentPadding">
			{#each socialProfiles as { platform, url } (url)}
				<Link
					class="w-full flex flex-row items-center leading-none gap-[1em] px-[1.5em] py-[1em] rounded-[0.5em] text-sm font-bold text-background border-2 border-background border-solid hover:bg-accent1 transition-colors duration-200"
					isExternal
					to={url}><Icon class="text-[2em]" name={platform} />{platform}</Link
				>
			{/each}
		</div>
	</Container>
</section>
