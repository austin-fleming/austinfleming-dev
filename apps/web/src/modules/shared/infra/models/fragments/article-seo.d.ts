import type { SeoImage } from './seo-image';
import type { SeoVideo } from './seo-video';

export type ArticleSEO = {
	canonicalUrl: string;
	description: string;
	doNotCrawl: boolean;
	image: SeoImage;
	keywords: string[];
	ogType: 'article';
	pageTitle: string;
	schemaType: 'Article';
	squareImage?: SeoImage;
	title: string;
	video?: SeoVideo;
};
