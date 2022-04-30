import type { SeoImage } from './seo-image';

export type PersonSEO = {
	canonicalUrl: string;
	description: string;
	doNotCrawl: boolean;
	image: SeoImage;
	keywords: string[];
	ogType: 'profile';
	schemaType: 'Person';
	squareImage?: SeoImage;
	title: string;
};
