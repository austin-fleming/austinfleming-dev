export type Link = {
	// NOTE: _key only required for portabletext parser
	_key: string;
	// NOTE: _type only required for portabletext parser
	_type: 'link';
	isExternal: boolean;
	to: string;
};

export type CTA = {
	_key: string;
	label: string;
	link: Link;
};
