import type { Nullable } from '$utils/nullable';
import { writable } from 'svelte/store';

type IsDarkmode = boolean;

type ThemeState = {
	isDarkmode: Nullable<IsDarkmode>;
};

export const themeStore = writable<ThemeState>({ isDarkmode: undefined });
