import type { Casestudy } from './casestudy';

export type HomePage = {
	_type: 'home_page';
	casestudies: Casestudy[];
	id: string;
	path: string;
	timestampModified: string;
	timestampPublished: string;
	title: string;
};
