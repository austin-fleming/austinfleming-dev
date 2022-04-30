import type { PersonSEO } from './fragments/person-seo';
import type { ImageAsset } from './image-asset';

export type Author = {
	blurb: string;
	id: string;
	name: string;
	occupation: string;
	path: string;
	primaryWebsiteUrl: string;
	profileImage: ImageAsset;
	seo: PersonSEO;
	slug: string;
	socialProfileUrls: string[];
	timestampModified?: string;
	timestampPublished: string;
};
