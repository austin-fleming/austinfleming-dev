import type { PersonSEO } from './fragments/person-seo';
import type { ImageAsset } from './image-asset';

export type Author = {
	blurb: string;
	name: string;
	occupation: string;
	primaryWebsiteUrl: string;
	profileImage: ImageAsset;
	seo: PersonSEO;
	socialProfileUrls: string[];
};
