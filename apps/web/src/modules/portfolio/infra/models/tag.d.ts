export type Tag = {
	id: string;
	path: string;
	seo: {
		canonical: string;
		pageTitle: string;
	};
	slug: string;
	timestampModified?: string;
	timestampPublished: string;
	title: string;
};
