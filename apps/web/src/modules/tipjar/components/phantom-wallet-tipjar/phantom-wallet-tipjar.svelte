<script lang="ts">
	import { onMount } from 'svelte';

	import PhantomIcon from '../phantom-icon.svelte';

	let web3: Record<String, unknown>;
	let mobileConnectionDeepLink: string | undefined = undefined;

	const connectWallet = async (onConnected: (account: string) => void) => {
		if (!window.ethereum) {
			window.alert('No wallet found!!!');

			return;
		}

		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const firstAccount = accounts[0];

		onConnected(firstAccount);
	};

	const checkWalletIsConnected = async (onConnected: (account: string) => void) => {
		if (!window.ethereum) {
			window.alert("Doesn't look like you have a wallet installed.");
			return;
		}

		const accounts = await window.ethereum.request({ method: 'eth_accounts' });

		const primaryAccount = accounts[0];

		if (!primaryAccount) {
			window.alert('Could not find an account in your wallet.');
			return;
		}

		onConnected(primaryAccount);
	};

	const isMobileDevice = () => 'ontouchstart' in window || 'onmsgesturechange' in window;

	const connect = () => {
		if (isMobileDevice()) {
			// TODO: handle URL from single source of truth
			// NOTE: uses deep links to open app on mobile
			const dappUrl = '192.168.50.130:3000';
			mobileConnectionDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
		}
	};

	onMount(() => {
		web3 = window?.ethereum;
		console.log('WEB3:', window.ethereum);
		console.log('SOLANA:', window.solana);
		console.log('COINBASE:', ethereum?.coinbase);
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

<div>
	{#if mobileConnectionDeepLink}
		<a href={mobileConnectionDeepLink}>Connect Metamask via App</a>
	{:else}
		<button
			type="button"
			on:click={() => {
				connect();
			}}>Connect Metamask</button
		>
	{/if}
</div>
