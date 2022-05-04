import type { Breadcrumb } from './fragments/breadcrumb';
import type { SimpleBlockText } from './fragments/simple-block-text';

export type CasestudiesPage = {
	_type: 'casestudies_page';
	breadcrumbs: Breadcrumb[];
	casestudies: Casestudy[];
	description?: SimpleBlockText;
	id: string;
	path: string;
	subtitle?: string;
	timestampModified: string;
	timestampPublished: string;
	title: string;
};
