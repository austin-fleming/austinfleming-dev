export type NavigationItem = {
	label: string;
	to: string;
};

export type NavigationItems = NavigationItem[];

export type NavigationConfig = {
	items: NavigationItems;
};

export const navigationConfig: NavigationConfig = {
	items: [
		{
			label: 'home',
			to: '/'
		},
		{
			label: 'work',
			to: '/work'
		},
		{
			label: 'contact',
			to: '/contact'
		}
	]
};
