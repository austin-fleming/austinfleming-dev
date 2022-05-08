<script lang="ts">
	import { themeStore } from '$modules/common/stores/theme.store';
	import { isNothing } from '$utils/nothing';

	import type { Nullable } from '$utils/nullable';
	import { onMount } from 'svelte';

	let htmlNode: Nullable<HTMLHtmlElement>;

	const darkmodeMediaQuery = (): MediaQueryList =>
		window.matchMedia('(prefers-color-scheme: dark)');

	const systemPrefersDarkmode = (): boolean => darkmodeMediaQuery().matches;

	const applyTheme = () => {
		if ($themeStore.isDarkmode) {
			htmlNode.classList.add('dark');
		} else {
			htmlNode.classList.remove('dark');
		}
	};

	const toggleTheme = () => {
		$themeStore.isDarkmode = !$themeStore.isDarkmode;
		applyTheme();
	};

	const setThemeBySystemPreference = () => {
		$themeStore.isDarkmode = systemPrefersDarkmode();
		applyTheme();
	};

	const initDarkmodeState = () => {
		if (isNothing($themeStore.isDarkmode)) {
			setThemeBySystemPreference();
		}

		applyTheme();
	};

	onMount(() => {
		htmlNode = document.querySelector('html');
		initDarkmodeState();

		darkmodeMediaQuery().addEventListener('change', setThemeBySystemPreference);
	});
</script>

<div class="darkmodeToggle">
	<input
		id="darkmode-toggle"
		type="checkbox"
		role="switch"
		aria-checked={$themeStore.isDarkmode}
		aria-label={`activate ${$themeStore.isDarkmode ? 'light' : 'dark'} mode`}
		checked={$themeStore.isDarkmode}
		on:click={toggleTheme}
		class="input"
	/>
	<label for="darkmode-toggle" class="label">
		<span class="iconBall" />
	</label>
</div>

<style>
	.darkmodeToggle {
		@apply relative;
	}

	.input {
		@apply sr-only;
		/* @apply opacity-0; */
	}

	.label {
		@apply relative
    flex
    flex-row
    flex-nowrap
    justify-between
    items-center
    bg-orange-100
    border-lime-600
    w-16
    h-8
    rounded-full
    cursor-pointer
    transition-all
    duration-300;
	}

	.sunIcon,
	.moonIcon {
		@apply h-6
    w-6
    transition-all
    duration-300;
	}

	.sunIcon {
		@apply opacity-100
    text-orange-300
    translate-x-[-.25rem];
	}

	.moonIcon {
		@apply opacity-0
    text-violet-100
    translate-x-[43px];
	}

	.iconBall {
		@apply absolute
    block
    w-6
    h-6
    top-1
    left-1
    bg-slate-900
    rounded-full
    duration-700
    bg-violet-900;

		animation-duration: 300ms;
		animation-fill-mode: forwards;
		animation-name: disable;
	}

	.input:checked + .label {
		@apply bg-violet-900;
	}

	.input:checked + .label .sunIcon {
		@apply translate-x-[-43px]
        opacity-0;
	}

	.input:checked + .label .moonIcon {
		@apply translate-x-1
        opacity-100;
	}

	.input:checked + .label .iconBall {
		@apply bg-orange-100;

		animation-duration: 300ms;
		animation-fill-mode: forwards;
		animation-name: activate;
	}

	@keyframes activate {
		0% {
			left: theme('spacing.1');
			width: theme('spacing.6');
		}
		60% {
			left: theme('spacing.1');
			width: theme('spacing.14');
		}
		100% {
			left: theme('spacing.9');
			width: theme('spacing.6');
		}
	}

	@keyframes disable {
		0% {
			left: theme('spacing.9');
			width: theme('spacing.6');
		}
		60% {
			left: theme('spacing.1');
			width: theme('spacing.14');
		}
		100% {
			left: theme('spacing.1');
			width: theme('spacing.6');
		}
	}
</style>
