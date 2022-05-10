import type { Author } from './author';
import type { ArticleBlockText } from './fragments/article-block-text';
import type { ArticleBody } from './fragments/article-body';
import type { ArticleSEO } from './fragments/article-seo';
import type { Breadcrumb } from './fragments/breadcrumb';
import type { SimpleBlockText } from './fragments/simple-block-text';
import type { ImageAsset } from './image-asset';
import type { Tag } from './tag';
import type { VideoAsset } from './video-asset';

type ProjectDetail = {
	description: SimpleBlockText;
	title: string;
};

export type Casestudy = {
	articleBody: ArticleBody;
	authors: Author[];
	body: ArticleBlockText;
	breadcrumbs: Breadcrumb[];
	featuredImage: ImageAsset;
	featuredVideo?: VideoAsset;
	id: string;
	isFeatured: boolean;
	isRestricted: boolean;
	next?: Casestudy;
	path: string;
	projectDetails?: ProjectDetail[];
	seo: ArticleSEO;
	shortSummary: string;
	slug: string;
	summary: SimpleBlockText;
	tags: Tag[];
	timestampModified?: string;
	timestampPublished: string;
	title: string;
};
