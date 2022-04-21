export type NavigationItem = {
	label: string;
	to: string;
};

export type NavigationItems = NavigationItem[];

export const navigationItems: NavigationItems = [
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
];
