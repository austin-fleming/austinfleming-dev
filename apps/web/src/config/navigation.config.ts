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
			to: '/case-studies'
		},
		{
			label: 'snippets',
			to: '/snippets'
		} /* ,
		{
			label: 'contact',
			to: '/contact'
		} */
	]
};
