<script>
	import { onMount } from 'svelte';

	import PhantomIcon from '../phantom-icon.svelte';

	onMount(() => {
		console.log('SOLANA:', window.solana);
	});
</script>

<button
	class="flex flex-row items-center leading-none gap-[1em] text-sm font-bold bg-primary text-background py-[0.6em] px-[1.5em]"
	type="button"
	on:click={() => window.solana.connect()}
>
	<PhantomIcon />
	<span>Phantom</span>
</button>
